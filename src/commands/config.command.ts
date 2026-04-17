import { configStore } from '@store/config.store.js';
import { BaseCommand } from '@commands/base.command.js';
import { Output } from '@utils/output.util.js';
import { MaskUtil } from '@utils/mask.util.js';
import { t } from '@utils/i18n/i18n.util.js';

export class ConfigCommand extends BaseCommand {
  public register(): void {
    this.program
      .command('config')
      .description('Show current settings')
      .action(async () => {
        const config = await configStore.get();

        if (!config) {
          Output.error(await t('configNotFound'));
          return;
        }

        const maskedToken = MaskUtil.mask(config.apiKey);

        const details = [
          `${await t('configLanguageLabel')}: ${config.language}`,
          `${await t('configAgentLabel')}: ${config.aiAgent}`,
          `${await t('configTokenLabel')}: ${maskedToken}`,
        ];

        Output.info(await t('configListTitle'));
        details.forEach((detail) => Output.info(`  • ${detail}`));
      });
  }
}
