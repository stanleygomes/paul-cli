import { configStore } from '@store/config.store.js';
import { Logger } from '@utils/logger.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import { ProjectValidator } from '@validators/project.validators.js';
import ora from 'ora';
import { ProjectsService } from '../../services/projects.service.js';

export class CreateProjectModule {
  public static async run(): Promise<void> {
    const name = await Prompt.ask<string>({
      messageKey: 'askProjectName',
      schema: ProjectValidator.projectName,
    });

    if (!name) return;

    const spinner = ora(await t('loading')).start();

    try {
      const project = await ProjectsService.createProject(name, spinner);

      if (project) {
        Logger.success(await t('projectCreated'));
      }
    } catch (error) {
      spinner.stop();
      const config = await configStore.get();
      if (config?.debug) {
        console.error('[DEBUG] Full Error Object:', error);
      }
      Logger.error(await t('errorFetchingTasks'));
    }
  }
}
