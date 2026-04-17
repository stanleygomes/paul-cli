import { Logger } from '@utils/logger.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import type { TodoistTask } from '../types/todoist-task.type.js';
import chalk from 'chalk';

export class TasksRender {
  public static async list(tasks: TodoistTask[], projectName?: string): Promise<void> {
    if (projectName) {
      Logger.info(`${await t('projectName')}: ${chalk.cyan.bold(projectName)}`);
    }

    Logger.info(await t('tasksListTitle'));
    console.log('────────────────────────────────────────────────');

    tasks.forEach((task) => {
      const priorityColors: Record<number, (text: string) => string> = {
        1: chalk.gray,
        2: chalk.blue,
        3: chalk.yellow,
        4: chalk.red.bold,
      };

      const priorityColor = priorityColors[task.priority] || chalk.white;
      const priorityLabel = priorityColor(`[P${task.priority}]`);
      const statusIcon = task.checked ? chalk.green('✔') : chalk.gray('☐');
      const content = task.checked ? chalk.strikethrough.gray(task.content) : task.content;

      process.stdout.write(`${statusIcon} ${priorityLabel} ${content}\n`);
    });

    console.log('────────────────────────────────────────────────');
  }
}
