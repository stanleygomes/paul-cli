import { createApiClient } from '../../api/api.js';
import { settingsStore } from '../../store/settings.store.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { TaskFormatter } from '../../utils/format/task-format.util.js';

export class ListTasksModule {
  public static async getActiveTasks(token: string) {
    const api = createApiClient(token);
    const allTasks = await api.task.list();
    return allTasks.filter((task) => !task.isDeleted);
  }

  public static async run(): Promise<void> {
    const token = await AuthGuard.requireToken();
    const settings = await settingsStore.get();
    const activeProjectId = settings.activeProjectId;

    let tasks = await Loader.run(() => this.getActiveTasks(token));

    if (activeProjectId) {
      tasks = tasks.filter((task) => task.projectId === activeProjectId);
      Output.info(
        (await t('activeProjectInfo')).replace('{name}', settings.activeProjectName || ''),
      );
    }

    if (tasks.length === 0) {
      Output.info(await t('noTasks'));
      return;
    }

    for (const task of tasks) {
      console.log(TaskFormatter.formatLine(task));
    }
  }
}
