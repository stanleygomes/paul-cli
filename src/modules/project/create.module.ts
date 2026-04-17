import { generateUUID } from '@paul/utils';
import { createApiClient } from '../../api/api.js';
import { DEFAULT_PROJECT_COLOR } from '../../constants/project.constant.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Prompt } from '../../utils/prompt.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { ProjectValidator } from '../../validators/project.validators.js';

export class CreateProjectModule {
  public static async run(nameArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const name = await Prompt.ask({
      messageKey: 'askProjectTitle',
      schema: ProjectValidator.name,
      initialValue: nameArg,
    });

    const payload = ProjectValidator.createPayload.parse({
      id: generateUUID(),
      name,
      color: DEFAULT_PROJECT_COLOR,
    });

    const api = createApiClient(token);
    await Loader.run(() => api.project.create(payload));

    Output.success(await t('projectCreated'));
  }
}
