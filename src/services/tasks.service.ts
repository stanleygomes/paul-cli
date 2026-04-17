import { createApiClient } from '@api/api.js';
import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import type { TodoistTask } from '../types/todoist-task.type.js';
import type { Ora } from 'ora';

import type { ApiClient } from '@api/api.js';

export class TasksService {
  private static async getApiOrExit(spinner?: Ora): Promise<ApiClient | null> {
    const config = await configStore.get();
    if (!config?.apiKey) {
      spinner?.stop();
      Output.error(await t('apiKeyNotFound'));
      return null;
    }
    return createApiClient(config.apiKey);
  }

  public static async getTasksOrExit(
    spinner: Ora,
    projectId?: string,
  ): Promise<TodoistTask[] | null> {
    const api = await this.getApiOrExit(spinner);
    if (!api) return null;

    const tasks = await api.tasks.list(projectId);
    spinner.stop();

    if (tasks.length === 0) {
      Output.info(await t('noTasksFound'));
      return null;
    }

    return tasks;
  }

  public static async createTask(
    data: Partial<TodoistTask>,
    spinner: Ora,
  ): Promise<TodoistTask | null> {
    const api = await this.getApiOrExit(spinner);
    if (!api) return null;

    const task = await api.tasks.create(data);
    spinner.stop();

    return task;
  }
}
