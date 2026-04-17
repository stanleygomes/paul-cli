import { I18n } from '../../utils/i18n/i18n.util.js';
import { Prompt } from '../../utils/prompt.util.js';
import type { Language } from '../../types/language.type.js';

export class AskLanguageModule {
  public static async run(): Promise<Language> {
    return Prompt.select<Language>({
      messageKey: 'selectLanguage',
      choices: [...I18n.choices],
    });
  }
}
