import { BaseCommand } from './base.command.js';
import { ProjectsModule } from '../modules/projects/projects.module.js';
import { t } from '../utils/i18n/i18n.util.js';

export class ProjectsCommand extends BaseCommand {
  public async register(): Promise<void> {
    this.program
      .command('projects')
      .description(await t('projectsCommandDescription'))
      .action(async () => {
        await ProjectsModule.list();
      });
  }
}
