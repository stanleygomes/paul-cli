import { configStore } from '@store/config.store.js';
import { Logger } from '@utils/logger.util.js';
import { MaskUtil } from '@utils/mask.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import { ProjectsRender } from '../../render/projects.render.js';

export class ListConfigModule {
  public static async run(): Promise<void> {
    const configData = await configStore.get();

    if (!configData) {
      Logger.error(await t('configNotFound'));
      return;
    }

    const maskedToken = MaskUtil.mask(configData.apiKey);

    Logger.info(await t('configListTitle'));
    Logger.info(`  • ${await t('configLanguageLabel')}: ${configData.language}`);
    Logger.info(`  • ${await t('configAgentLabel')}: ${configData.aiAgent}`);
    Logger.info(`  • ${await t('configTokenLabel')}: ${maskedToken}`);
    Logger.info(`  • Debug Mode: ${configData.debug ? 'ENABLED' : 'DISABLED'}`);

    await ProjectsRender.selectedProject(configData.defaultProject?.name);
  }
}
