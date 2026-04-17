import { createApiClient } from '@api/api.js';
import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import type { TodoistTask } from '../types/todoist-task.type.js';
import type { Ora } from 'ora';

export class TasksService {
  public static async getTasksOrExit(spinner: Ora): Promise<TodoistTask[] | null> {
    const config = await configStore.get();
    if (!config?.apiKey) {
      spinner.stop();
      Output.error(await t('apiKeyNotFound'));
      return null;
    }

    const api = createApiClient(config.apiKey);
    const tasks = await api.tasks.list();

    spinner.stop();

    if (tasks.length === 0) {
      Output.info(await t('noTasksFound'));
      return null;
    }

    return tasks;
  }
}
