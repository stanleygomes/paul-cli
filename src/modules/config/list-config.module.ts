import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { MaskUtil } from '@utils/mask.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import { ProjectsRender } from '../../render/projects.render.js';

export class ListConfigModule {
  public static async run(): Promise<void> {
    const configData = await configStore.get();

    if (!configData) {
      Output.error(await t('configNotFound'));
      return;
    }

    const maskedToken = MaskUtil.mask(configData.apiKey);

    Output.info(await t('configListTitle'));
    Output.info(`  • ${await t('configLanguageLabel')}: ${configData.language}`);
    Output.info(`  • ${await t('configAgentLabel')}: ${configData.aiAgent}`);
    Output.info(`  • ${await t('configTokenLabel')}: ${maskedToken}`);
    Output.info(`  • Debug Mode: ${configData.debug ? 'ENABLED' : 'DISABLED'}`);

    await ProjectsRender.selectedProject(configData.defaultProject?.name);
  }
}
