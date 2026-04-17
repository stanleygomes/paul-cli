import { ConfigValidator } from '@validators/config.validators.js';
import { t } from '@utils/i18n/i18n.util.js';
import { configStore } from '@store/config.store.js';
import { Logger } from '@utils/logger.util.js';
import { Prompt } from '@utils/prompt.util.js';
import { AI_AGENT_CHOICES } from '@constants/ai-agents.constant.js';
import type { AiAgent } from '../../types/config.type.js';

export class SetAiAgentModule {
  public static async run(aiAgentArg?: string): Promise<void> {
    const config = await configStore.get();
    if (!config) {
      Logger.error(await t('configNotFound'));
      return;
    }

    let aiAgent: AiAgent;

    if (aiAgentArg) {
      aiAgent = ConfigValidator.aiAgent.parse(aiAgentArg);
    } else {
      aiAgent = await Prompt.select<AiAgent>({
        messageKey: 'askAiAgent',
        choices: AI_AGENT_CHOICES,
      });
    }

    await configStore.save({
      ...config,
      aiAgent,
    });

    Logger.success(await t('aiAgentUpdated'));
  }
}
