import { configStore } from '@store/config.store.js';
import { Logger } from '@utils/logger.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';

export class SetDebugModule {
  public static async run(): Promise<void> {
    const config = await configStore.get();
    if (!config) {
      Logger.error('CLI not initialized. Run "paul init" first.');
      return;
    }

    const debug = await Prompt.confirm('askDebugMode');

    await configStore.save({
      ...config,
      debug,
    });

    Logger.success(await t('debugUpdated'));
    Logger.info(debug ? 'ENABLED' : 'DISABLED');
  }
}
