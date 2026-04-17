import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';

export class SetDebugModule {
  public static async run(): Promise<void> {
    const config = await configStore.get();
    if (!config) {
      Output.error('CLI not initialized. Run "paul init" first.');
      return;
    }

    const debug = await Prompt.confirm('askDebugMode');

    await configStore.save({
      ...config,
      debug,
    });

    Output.success(await t('debugUpdated'));
    Output.info(debug ? 'ENABLED' : 'DISABLED');
  }
}
