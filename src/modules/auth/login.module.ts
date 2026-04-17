import { createApiClient } from '../../api/api.js';
import { Prompt } from '../../utils/prompt.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { AuthValidator } from '../../validators/auth.validators.js';
import { sessionStore } from '../../store/session.store.js';
import { Output } from '../../utils/output.util.js';
import { t } from '../../utils/i18n/i18n.util.js';

export class LoginModule {
  public static async run(): Promise<void> {
    const email = await Prompt.ask({
      messageKey: 'askEmail',
      schema: AuthValidator.email,
    });

    const api = createApiClient();
    const sendCodeResult = await Loader.run(() => api.auth.sendLoginCode(email));

    Output.info(sendCodeResult.isRegistered ? await t('codeSentExisting') : await t('codeSentNew'));

    const code = await Prompt.ask({
      messageKey: 'askCode',
      schema: AuthValidator.otpCode,
    });

    const verifyCodeResult = await Loader.run(() => api.auth.verifyLoginCode(email, code));

    await sessionStore.save({
      token: verifyCodeResult.token,
      refreshToken: verifyCodeResult.refreshToken,
      email,
    });

    Output.success(await t('loginSuccess'));
  }
}
