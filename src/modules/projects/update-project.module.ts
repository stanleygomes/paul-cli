import { configStore } from '@store/config.store.js';
import { Logger } from '@utils/logger.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import { ProjectValidator } from '@validators/project.validators.js';
import ora from 'ora';
import { ProjectsService } from '../../services/projects.service.js';

export class UpdateProjectModule {
  public static async run(): Promise<void> {
    const config = await configStore.get();

    if (!config?.apiKey) {
      Logger.error(await t('apiKeyNotFound'));
      return;
    }

    const spinner = ora(await t('fetchingProjects')).start();

    try {
      const projects = await ProjectsService.getProjectsOrExit(spinner);
      if (!projects) return;

      const choices = projects.map((project) => ({
        name: project.name,
        value: project.id,
      }));

      const projectId = await Prompt.select<string>({
        messageKey: 'askEditProject',
        choices,
      });

      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      const newName = await Prompt.ask<string>({
        messageKey: 'askNewProjectName',
        schema: ProjectValidator.projectName,
        initialValue: project.name,
      });

      if (!newName || newName === project.name) return;

      const updateSpinner = ora(await t('loading')).start();
      await ProjectsService.updateProject(projectId, newName, updateSpinner);

      Logger.success(await t('projectUpdated'));
    } catch (error) {
      spinner.stop();
      if (config?.debug) {
        console.error('[DEBUG] Full Error Object:', error);
      }
      Logger.error(await t('errorFetchingTasks'));
    }
  }
}
