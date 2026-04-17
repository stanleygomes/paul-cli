import { createApiClient } from '@api/api.js';
import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { DictionaryKey, t } from '@utils/i18n/i18n.util.js';
import ora from 'ora';

export class ProjectsModule {
  public static async list(): Promise<void> {
    const config = await configStore.get();

    if (!config?.apiKey) {
      Output.error(await t('apiKeyNotFound'));
      return;
    }

    if (config.debug) {
      const masked = `${config.apiKey.substring(0, 4)}...${config.apiKey.substring(config.apiKey.length - 4)}`;
      console.log(`[DEBUG] Requesting Todoist Projects with token: ${masked}`);
    }

    const spinner = ora(await t('fetchingProjects')).start();

    try {
      const api = createApiClient(config.apiKey);
      const projects = await api.projects.list();

      spinner.stop();

      if (projects.length === 0) {
        Output.info(await t('noProjectsFound'));
        return;
      }

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
