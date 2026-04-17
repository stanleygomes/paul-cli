import { settingsStore } from '../../store/settings.store.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Prompt } from '../../utils/prompt.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { TaskValidator } from '../../validators/task.validators.js';
import { ListTasksModule } from './list.module.js';

export class ResolveTaskModule {
  public static async resolveId(taskId?: string): Promise<string> {
    if (taskId) {
      return TaskValidator.id.parse(taskId);
    }

    const token = await AuthGuard.requireToken();
    const settings = await settingsStore.get();
    const activeProjectId = settings.activeProjectId;

    let tasks = await Loader.run(() => ListTasksModule.getActiveTasks(token));

    if (activeProjectId) {
      tasks = tasks.filter((task) => task.projectId === activeProjectId);
    }

    if (tasks.length === 0) {
      throw new Error(await t('noTasks'));
    }

    return Prompt.select({
      messageKey: 'selectTask',
      choices: tasks.map((task) => ({
        name: task.title,
        value: task.id,
      })),
    });
  }
}
