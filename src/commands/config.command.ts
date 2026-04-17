import { BaseCommand } from '@commands/base.command.js';
import { SetLanguageModule } from '@modules/config/set-language.module.js';
import { ListConfigModule } from '@modules/config/list-config.module.js';

export class ConfigCommand extends BaseCommand {
  public register(): void {
    const config = this.program.command('config').description('Manage CLI configuration');

    config
      .command('list')
      .alias('ls')
      .description('Show current settings')
      .action(ListConfigModule.run);

    config
      .command('language')
      .description('Change language (en|pt)')
      .argument('[language]', 'Language code')
      .action(SetLanguageModule.run);
  }
}
