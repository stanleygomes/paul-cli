import { select } from '@inquirer/prompts';
import { I18n } from '../../utils/i18n/i18n.util.js';
import type { Language } from '../../types/language.type.js';

export class AskLanguageModule {
  public static async run(): Promise<Language> {
    return select({
      message: 'Language',
      choices: I18n.choices,
    }) as Promise<Language>;
  }
}
