import { BaseCommand } from './base.command.js';
import { TasksModule } from '@modules/tasks/tasks.module.js';
import { CreateTaskModule } from '@modules/tasks/create-task.module.js';
import { t } from '@utils/i18n/i18n.util.js';

export class TasksCommand extends BaseCommand {
  public async register(): Promise<void> {
    this.program
      .command('create')
      .description(await t('createTaskCommandDescription'))
      .action(async () => {
        await CreateTaskModule.run();
      });

    const tasks = this.program
      .command('tasks')
      .alias('task')
      .description(await t('tasksCommandDescription'))
      .action(async () => {
        await TasksModule.list();
      });

    tasks
      .command('create')
      .alias('add')
      .description(await t('createTaskCommandDescription'))
      .action(async () => {
        await CreateTaskModule.run();
      });
  }
}
