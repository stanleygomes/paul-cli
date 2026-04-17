import { sessionStore } from '../store/session.store.js';
import { LoginModule } from '../modules/auth/login.module.js';
import { t } from './i18n/i18n.util.js';
import { Output } from './output.util.js';

export class AuthGuard {
  public static async requireToken(): Promise<string> {
    let session = await sessionStore.get();

    if (!session?.token) {
      Output.info(await t('loginRequired'));
      await LoginModule.run();
      session = await sessionStore.get();
    }

    if (!session?.token) {
      throw new Error(await t('loginRequired'));
    }

    return session.token;
  }
}
