import { createApiClient } from '@api/api.js';
import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import type { TodoistProject } from '../types/todoist-project.type.js';
import type { Ora } from 'ora';

import type { ApiClient } from '@api/api.js';

export class ProjectsService {
  private static async getApiOrExit(spinner?: Ora): Promise<ApiClient | null> {
    const config = await configStore.get();
    if (!config?.apiKey) {
      spinner?.stop();
      Output.error(await t('apiKeyNotFound'));
      return null;
    }
    return createApiClient(config.apiKey);
  }

  public static async getProjectsOrExit(spinner: Ora): Promise<TodoistProject[] | null> {
    const api = await this.getApiOrExit(spinner);
    if (!api) return null;

    const projects = await api.projects.list();
    spinner.stop();

    if (projects.length === 0) {
      Output.info(await t('noProjectsFound'));
      return null;
    }

    return projects;
  }

  public static async createProject(name: string, spinner: Ora): Promise<TodoistProject | null> {
    const api = await this.getApiOrExit(spinner);
    if (!api) return null;

    const project = await api.projects.create(name);
    spinner.stop();

    return project;
  }

  public static async deleteProject(id: string, spinner: Ora): Promise<boolean> {
    const api = await this.getApiOrExit(spinner);
    if (!api) return false;

    await api.projects.delete(id);
    spinner.stop();

    return true;
  }

  public static async updateProject(
    id: string,
    name: string,
    spinner: Ora,
  ): Promise<TodoistProject | null> {
    const api = await this.getApiOrExit(spinner);
    if (!api) return null;

    const project = await api.projects.update(id, name);
    spinner.stop();

    return project;
  }
}
