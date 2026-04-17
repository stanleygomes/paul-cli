import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import ora from 'ora';
import { ProjectsService } from '../../services/projects.service.js';

export class DeleteProjectModule {
  public static async run(): Promise<void> {
    const config = await configStore.get();

    if (!config?.apiKey) {
      Output.error(await t('apiKeyNotFound'));
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
        messageKey: 'askDeleteProject',
        choices,
      });

      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      const confirm = await Prompt.confirm({
        message: (await t('deleteProjectConfirm')).replace('{name}', project.name),
        default: false,
      });

      if (!confirm) return;

      const deleteSpinner = ora(await t('loading')).start();
      await ProjectsService.deleteProject(projectId, deleteSpinner);

      Output.success(await t('projectDeleted'));
    } catch (error) {
      spinner.stop();
      if (config?.debug) {
        console.error('[DEBUG] Full Error Object:', error);
      }
      Output.error(await t('errorFetchingTasks'));
    }
  }
}
