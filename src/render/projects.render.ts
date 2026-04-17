import { Logger } from '@utils/logger.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import type { TodoistProject } from '../types/todoist-project.type.js';
import boxen from 'boxen';
import chalk from 'chalk';

export class ProjectsRender {
  public static async list(projects: TodoistProject[]): Promise<void> {
    Logger.info(await t('projectsListTitle'));
    projects.forEach((project) => {
      const favoriteIcon = project.is_favorite ? '⭐ ' : '';
      Logger.log(`  • ${favoriteIcon}${project.name}`);
    });
  }

  public static async selectedProject(projectName?: string): Promise<void> {
    const label = await t('projectName');
    const name = projectName || (await t('none'));
    const color = projectName ? 'cyan' : 'gray';

    console.log(
      boxen(`${chalk.bold(label)}: ${chalk.bold(name)}`, {
        padding: { left: 1, right: 1, top: 0, bottom: 0 },
        borderColor: color,
        borderStyle: 'round',
        dimBorder: true,
      }),
    );
  }
}
