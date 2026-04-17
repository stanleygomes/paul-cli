import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { MaskUtil } from '@utils/mask.util.js';
import { t } from '@utils/i18n/i18n.util.js';

export class ListConfigModule {
  public static async run(): Promise<void> {
    const configData = await configStore.get();

    if (!configData) {
      Output.error(await t('configNotFound'));
      return;
    }

    const maskedToken = MaskUtil.mask(configData.apiKey);

    const details = [
      `${await t('configLanguageLabel')}: ${configData.language}`,
      `${await t('configAgentLabel')}: ${configData.aiAgent}`,
      `${await t('configTokenLabel')}: ${maskedToken}`,
    ];

    Output.info(await t('configListTitle'));
    details.forEach((detail) => Output.info(`  • ${detail}`));
  }
}
