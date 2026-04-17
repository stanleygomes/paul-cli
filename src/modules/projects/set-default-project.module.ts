import { ProjectsService } from '../../services/projects.service.js';
import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import ora from 'ora';

export class SetDefaultProjectModule {
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

      const choices = [
        { name: await t('none'), value: '' },
        ...projects.map((project) => ({
          name: project.name,
          value: project.id,
        })),
      ];

      const defaultProjectId = await Prompt.select<string>({
        messageKey: 'selectDefaultProject',
        choices,
      });

      const selectedProject = projects.find((p) => p.id === defaultProjectId);

      const defaultProject = selectedProject
        ? { id: selectedProject.id, name: selectedProject.name }
        : undefined;

      await configStore.save({ ...config, defaultProject });

      Output.success(await t('defaultProjectUpdated'));
    } catch (error) {
      spinner.stop();
      if (config?.debug) {
        console.error('[DEBUG] Full Error Object:', error);
      }
      Output.error(await t('errorFetchingTasks'));
    }
  }
}
