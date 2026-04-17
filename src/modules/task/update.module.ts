import { createApiClient } from '../../api/api.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Prompt } from '../../utils/prompt.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { TaskValidator } from '../../validators/task.validators.js';
import { ResolveTaskModule } from './resolve.module.js';

export class UpdateTaskModule {
  public static async run(taskIdArg?: string, titleArg?: string): Promise<void> {
    const token = await AuthGuard.requireToken();
    const taskId = await ResolveTaskModule.resolveId(taskIdArg);
    const title = await Prompt.ask({
      messageKey: 'askTaskTitle',
      schema: TaskValidator.title,
      initialValue: titleArg,
    });

    const api = createApiClient(token);
    await Loader.run(() =>
      api.task.update(taskId, {
        title,
        updatedAt: Date.now(),
      }),
    );

    Output.success(await t('taskUpdated'));
  }
}
