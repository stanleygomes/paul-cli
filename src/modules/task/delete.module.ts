import { createApiClient } from '../../api/api.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { ResolveTaskModule } from './resolve.module.js';

export class DeleteTaskModule {
  public static async run(taskIdArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const taskId = await ResolveTaskModule.resolveId(taskIdArg);

    const api = createApiClient(token);
    await Loader.run(() => api.task.delete(taskId));

    Output.success(await t('taskDeleted'));
  }
}
