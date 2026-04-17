import { configStore } from '@store/config.store.js';
import { DictionaryKey, t } from '@utils/i18n/i18n.util.js';
import ora from 'ora';
import { TasksService } from '../../services/tasks.service.js';
import { TasksRender } from '../../render/tasks.render.js';

export class TasksModule {
  public static async list(): Promise<void> {
    const config = await configStore.get();
    const spinner = ora(await t('fetchingTasks')).start();

    try {
      const tasks = await TasksService.getTasksOrExit(spinner, config?.defaultProject?.id);
      if (!tasks) return;

      await TasksRender.list(tasks, config?.defaultProject?.name);
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
