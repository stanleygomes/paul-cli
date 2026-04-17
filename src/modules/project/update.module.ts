import { createApiClient } from '../../api/api.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Prompt } from '../../utils/prompt.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { ProjectValidator } from '../../validators/project.validators.js';
import { ResolveProjectModule } from './resolve.module.js';

export class UpdateProjectModule {
  public static async run(projectIdArg?: string, nameArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const projectId = await ResolveProjectModule.resolveId(projectIdArg);
    const name = await Prompt.ask({
      messageKey: 'askProjectTitle',
      schema: ProjectValidator.name,
      initialValue: nameArg,
    });

    const api = createApiClient(token);
    await Loader.run(() =>
      api.project.update(projectId, {
        name,
        updatedAt: Date.now(),
      }),
    );

    Output.success(await t('projectUpdated'));
  }
}
