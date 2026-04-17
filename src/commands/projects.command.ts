import { BaseCommand } from './base.command.js';
import { ProjectsModule } from '../modules/projects/list-projects.module.js';
import { SetDefaultProjectModule } from '../modules/projects/set-default-project.module.js';
import { CreateProjectModule } from '../modules/projects/create-project.module.js';
import { t } from '../utils/i18n/i18n.util.js';

export class ProjectsCommand extends BaseCommand {
  public async register(): Promise<void> {
    const projects = this.program
      .command('projects')
      .alias('project')
      .description(await t('projectsCommandDescription'))
      .action(async () => {
        await ProjectsModule.list();
      });

    projects
      .command('default')
      .description(await t('projectDefaultCommandDescription'))
      .action(async () => {
        await SetDefaultProjectModule.run();
      });

    projects
      .command('create')
      .description(await t('createProjectCommandDescription'))
      .action(async () => {
        await CreateProjectModule.run();
      });
  }
}
