import { BaseCommand } from './base.command.js';
import { TasksModule } from '@modules/tasks/tasks.module.js';
import { t } from '@utils/i18n/i18n.util.js';

export class TasksCommand extends BaseCommand {
  public async register(): Promise<void> {
    this.program
      .command('tasks')
      .description(await t('tasksCommandDescription'))
      .action(async () => {
        await TasksModule.list();
      });
  }
}
