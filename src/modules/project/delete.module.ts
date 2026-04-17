import { createApiClient } from '../../api/api.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { ResolveProjectModule } from './resolve.module.js';

export class DeleteProjectModule {
  public static async run(projectIdArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const projectId = await ResolveProjectModule.resolveId(projectIdArg);

    const api = createApiClient(token);
    await Loader.run(() => api.project.delete(projectId));

    Output.success(await t('projectDeleted'));
  }
}
