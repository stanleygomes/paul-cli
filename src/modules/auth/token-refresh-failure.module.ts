import { sessionStore } from '../../store/session.store.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';

export class TokenRefreshFailureModule {
  public static async run() {
    await sessionStore.clear();
    Output.error(await t('sessionExpired'));
    Output.error(await t('loginAgain'));
  }
}
