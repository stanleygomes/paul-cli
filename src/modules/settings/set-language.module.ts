import { ConfigValidator } from '../../validators/config.validators.js';
import { I18n, t } from '../../utils/i18n/i18n.util.js';

import { configStore } from '../../store/config.store.js';
import { Output } from '../../utils/output.util.js';
import { AskLanguageModule } from './ask-language.module.js';

export class SetLanguageModule {
  public static async run(languageArg?: string): Promise<void> {
    const config = await configStore.get();
    if (!config) {
      Output.error('CLI not initialized. Run "paul init" first.');
      return;
    }

    const languageValue = languageArg ?? (await AskLanguageModule.run());
    const language = ConfigValidator.language.parse(languageValue);

    await configStore.save({
      ...config,
      language,
    });

    I18n.setLanguage(language);

    Output.success(await t('languageUpdated'));
    Output.info(I18n.getLabel(language));
  }
}
