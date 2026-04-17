import { configStore } from '@store/config.store.js';
import { Output } from '@utils/output.util.js';
import { MaskUtil } from '@utils/mask.util.js';
import { t } from '@utils/i18n/i18n.util.js';
import { ProjectsService } from '../../services/projects.service.js';
import ora from 'ora';

export class ListConfigModule {
  public static async run(): Promise<void> {
    const configData = await configStore.get();

    if (!configData) {
      Output.error(await t('configNotFound'));
      return;
    }

    const maskedToken = MaskUtil.mask(configData.apiKey);
    let defaultProjectLabel = await t('none');

    if (configData.defaultProjectId) {
      const spinner = ora().start();
      try {
        const projects = await ProjectsService.getProjectsOrExit(spinner);
        const project = projects?.find((p) => p.id === configData.defaultProjectId);
        if (project) {
          defaultProjectLabel = project.name;
        } else {
          defaultProjectLabel = configData.defaultProjectId;
        }
      } catch {
        spinner.stop();
        defaultProjectLabel = configData.defaultProjectId;
      }
    }

    const details = [
      `${await t('configLanguageLabel')}: ${configData.language}`,
      `${await t('configAgentLabel')}: ${configData.aiAgent}`,
      `${await t('configTokenLabel')}: ${maskedToken}`,
      `${await t('projectName')}: ${defaultProjectLabel}`,
      `Debug Mode: ${configData.debug ? 'ENABLED' : 'DISABLED'}`,
    ];

    Output.info(await t('configListTitle'));
    details.forEach((detail) => Output.info(`  • ${detail}`));
  }
}
