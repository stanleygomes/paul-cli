import { BaseCommand } from '@commands/base.command.js';
import { SetLanguageModule } from '@modules/config/set-language.module.js';
import { SetApiKeyModule } from '@modules/config/set-api-key.module.js';
import { SetAiAgentModule } from '@modules/config/set-ai-agent.module.js';
import { ListConfigModule } from '@modules/config/list-config.module.js';
import { ResetConfigModule } from '@modules/config/reset-config.module.js';

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

    config
      .command('token')
      .alias('apikey')
      .description('Update Todoist API Key')
      .argument('[token]', 'Todoist API Key')
      .action(SetApiKeyModule.run);

    config
      .command('agent')
      .description('Update favorite AI Agent')
      .argument('[agent]', 'AI Agent name')
      .action(SetAiAgentModule.run);

    config
      .command('reset')
      .alias('logout')
      .description('Delete all settings and logout')
      .action(ResetConfigModule.run);
  }
}
