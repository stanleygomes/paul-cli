import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { t } from '@utils/i18n/i18n.util.js';

export class ResetConfigModule {
  public static async run(): Promise<void> {
    const config = await configStore.get();

    if (!config) {
      Output.error(await t('configNotFound'));
      return;
    }

    const confirmed = await Prompt.confirm('configResetConfirm');

    if (!confirmed) {
      Output.info(await t('configResetCanceled'));
      return;
    }

    await configStore.clear();

    Output.success(await t('configResetSuccess'));
  }
}
