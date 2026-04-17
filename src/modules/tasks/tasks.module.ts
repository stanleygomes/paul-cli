import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { DictionaryKey, t } from '@utils/i18n/i18n.util.js';
import ora from 'ora';
import { TasksService } from '../../services/tasks.service.js';

export class TasksModule {
  public static async list(): Promise<void> {
    const config = await configStore.get();
    const spinner = ora(await t('fetchingTasks')).start();

    try {
      const tasks = await TasksService.getTasksOrExit(spinner);
      if (!tasks) return;

      Output.info(await t('tasksListTitle'));
      tasks.forEach((task) => {
        const priority = 'P' + task.priority;
        Output.log(`${task.checked ? '✔' : '☐'} ${task.content} (${priority})`);
      });
    } catch (error) {
      spinner.stop();

      if (config?.debug) {
        console.error('[DEBUG] Full Error Object:', error);
      }

      const messageKey = (
        error instanceof Error ? error.message : 'errorFetchingTasks'
      ) as DictionaryKey;
      spinner.fail(await t(messageKey));
    }
  }
}
