import chalk from 'chalk';

export class Logger {
  public static success(message: string): void {
    console.log(chalk.green(`✔ ${message}`));
  }

  public static info(message: string): void {
    console.log(chalk.blue(`ℹ ${message}`));
  }

  public static warning(message: string): void {
    console.log(chalk.yellow(`⚠ ${message}`));
  }

  public static error(message: string): void {
    console.error(chalk.red(`✖ ${message}`));
  }

  public static log(message: string): void {
    console.log(message);
  }
}
