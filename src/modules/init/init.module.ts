import { configStore } from '@store/config.store.js';
import type { AiAgent, CliConfig } from '../../types/config.type.js';
import { I18n, t } from '@utils/i18n/i18n.util.js';
import { Logger } from '@utils/logger.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { ConfigValidator } from '@validators/config.validators.js';
import { AI_AGENT_CHOICES } from '@constants/ai-agents.constant.js';
import { AskLanguageModule } from '@modules/config/ask-language.module.js';

export class InitModule {
  public static async run(): Promise<void> {
    const language = await AskLanguageModule.run();
    I18n.setLanguage(language);

    const apiKey = await Prompt.secret({
      messageKey: 'askApiKey',
      schema: ConfigValidator.apiKey,
    });

    // de opcao do usuario escolher nenhum agente
    // escreva uma mensagem informando para que serve essa funcionalidade de agente (para ajudar na gestao de tarefas)
    const aiAgent = await Prompt.select<AiAgent>({
      messageKey: 'askAiAgent',
      choices: AI_AGENT_CHOICES,
    });

    const config: CliConfig = {
      apiKey,
      aiAgent,
      language,
      debug: false,
    };

    await configStore.save(config);

    Logger.success(await t('initSuccess'));
  }
}
