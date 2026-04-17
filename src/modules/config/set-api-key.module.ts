import { ConfigValidator } from '@validators/config.validators.js';
import { t } from '@utils/i18n/i18n.util.js';
import { configStore } from '@store/config.store.js';
import { Logger } from '@utils/logger.util.js';
import { Prompt } from '@utils/prompt.util.js';

export class SetApiKeyModule {
  public static async run(apiKeyArg?: string): Promise<void> {
    const config = await configStore.get();
    if (!config) {
      Logger.error(await t('configNotFound'));
      return;
    }

    const apiKey =
      apiKeyArg ??
      (await Prompt.secret({
        messageKey: 'askApiKey',
        schema: ConfigValidator.apiKey,
      }));

    await configStore.save({
      ...config,
      apiKey,
    });

    Logger.success(await t('apiKeyUpdated'));
  }
}
