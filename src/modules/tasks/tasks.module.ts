import { TodoistIntegration } from '@integrations/todoist/todoist.integration.js';
import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { DictionaryKey, t } from '@utils/i18n/i18n.util.js';
import ora from 'ora';

export class TasksModule {
  public static async list(): Promise<void> {
    const config = await configStore.get();

    if (!config?.apiKey) {
      Output.error(await t('apiKeyNotFound'));
      return;
    }

    const spinner = ora(await t('fetchingTasks')).start();

    try {
      const todoist = new TodoistIntegration(config.apiKey);
      const tasks = await todoist.getTasks();

      spinner.stop();

      if (tasks.length === 0) {
        Output.info(await t('noTasksFound'));
        return;
      }

      Output.info(await t('tasksListTitle'));
      tasks.forEach((task) => {
        const priority = 'P' + task.priority;
        Output.log(`${task.checked ? '✔' : '☐'} ${task.content} (${priority})`);
      });
    } catch (error) {
      const messageKey = (
        error instanceof Error ? error.message : 'errorFetchingTasks'
      ) as DictionaryKey;
      spinner.fail(await t(messageKey));
    }
  }
}
