import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import { TaskValidator } from '@validators/task.validators.js';
import ora from 'ora';
import { TasksService } from '../../services/tasks.service.js';
import { ProjectsRender } from '../../render/projects.render.js';

export class CreateTaskModule {
  public static async run(): Promise<void> {
    const config = await configStore.get();

    if (!config?.apiKey) {
      Output.error(await t('apiKeyNotFound'));
      return;
    }

    await ProjectsRender.selectedProject(config.defaultProject?.name);

    const content = await Prompt.ask<string>({
      messageKey: 'askTaskContent',
      schema: TaskValidator.content,
    });

    if (!content) return;

    const spinner = ora(await t('loading')).start();

    try {
      const task = await TasksService.createTask(
        {
          content,
          project_id: config.defaultProject?.id,
        },
        spinner,
      );

      if (task) {
        Output.success(await t('taskCreated'));
      }
    } catch (error) {
      spinner.stop();
      if (config?.debug) {
        console.error('[DEBUG] Full Error Object:', error);
      }
      Output.error(await t('errorFetchingTasks'));
    }
  }
}
