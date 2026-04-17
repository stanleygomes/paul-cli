import { configStore } from '@store/config.store.js';
import { DictionaryKey, t } from '@utils/i18n/i18n.util.js';
import { Output } from '@utils/output.util.js';
import ora from 'ora';
import { ProjectsService } from '../../services/projects.service.js';

export class ProjectsModule {
  public static async list(): Promise<void> {
    const config = await configStore.get();
    const spinner = ora(await t('fetchingProjects')).start();

    try {
      const projects = await ProjectsService.getProjectsOrExit(spinner);
      if (!projects) return;

      Output.info(await t('projectsListTitle'));
      projects.forEach((project) => {
        const favoriteIcon = project.is_favorite ? '⭐ ' : '';
        Output.log(`  • ${favoriteIcon}${project.name}`);
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
