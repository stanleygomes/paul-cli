import { InitModule } from '../modules/init/init.module.js';
import { BaseCommand } from './base.command.js';

export class InitCommand extends BaseCommand {
  public register(): void {
    this.program
      .command('init')
      .description('Initialize Paul CLI configuration')
      .action(InitModule.run);
  }
}
