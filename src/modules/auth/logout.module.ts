import { sessionStore } from '../../store/session.store.js';
import { Output } from '../../utils/output.util.js';
import { t } from '../../utils/i18n/i18n.util.js';

export class LogoutModule {
  public static async run(): Promise<void> {
    await sessionStore.clear();
    Output.success(await t('logoutSuccess'));
  }
}
