import { createApiClient } from '@api/api.js';
import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import type { TodoistProject } from '../types/todoist-project.type.js';
import type { Ora } from 'ora';

export class ProjectsService {
  public static async getProjectsOrExit(spinner: Ora): Promise<TodoistProject[] | null> {
    const config = await configStore.get();
    if (!config?.apiKey) {
      spinner.stop();
      Output.error(await t('apiKeyNotFound'));
      return null;
    }

    const api = createApiClient(config.apiKey);
    const projects = await api.projects.list();

    spinner.stop();

    if (projects.length === 0) {
      Output.info(await t('noProjectsFound'));
      return null;
    }

    return projects;
  }
}
