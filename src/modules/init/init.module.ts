import { configStore } from '../../store/config.store.js';
import type { AiAgent, CliConfig } from '../../types/config.type.js';
import { I18n, t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Prompt } from '../../utils/prompt.util.js';
import { ConfigValidator } from '../../validators/config.validators.js';
import { AI_AGENT_CHOICES } from '../../constants/ai-agents.constant.js';
import { AskLanguageModule } from '../settings/ask-language.module.js';

export class InitModule {
  public static async run(): Promise<void> {
    const language = await AskLanguageModule.run();
    I18n.setLanguage(language);

    const apiKey = await Prompt.secret({
      messageKey: 'askApiKey',
      schema: ConfigValidator.apiKey,
    });

    const aiAgent = await Prompt.select<AiAgent>({
      messageKey: 'askAiAgent',
      choices: AI_AGENT_CHOICES,
    });

    const config: CliConfig = {
      apiKey,
      aiAgent,
      language,
    };

    await configStore.save(config);

    Output.success(await t('initSuccess'));
  }
}
