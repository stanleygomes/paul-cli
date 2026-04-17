import { Output } from '@utils/output.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import type { TodoistProject } from '../types/todoist-project.type.js';

export class ProjectsRender {
  public static async list(projects: TodoistProject[]): Promise<void> {
    Output.info(await t('projectsListTitle'));
    projects.forEach((project) => {
      const favoriteIcon = project.is_favorite ? '⭐ ' : '';
      Output.log(`  • ${favoriteIcon}${project.name}`);
    });
  }
}
