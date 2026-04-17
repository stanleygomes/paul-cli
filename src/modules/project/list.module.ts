import { createApiClient } from '../../api/api.js';
import { AuthGuard } from '../../utils/auth-guard.util.js';
import { t } from '../../utils/i18n/i18n.util.js';
import { Output } from '../../utils/output.util.js';
import { Loader } from '../../utils/spinner.util.js';
import { ProjectFormatter } from '../../utils/format/project-format.util.js';

export class ListProjectsModule {
  public static async getActiveProjects(token: string) {
    const api = createApiClient(token);
    const allProjects = await api.project.list();
    return allProjects.filter((project) => !project.isDeleted);
  }

  public static async run(): Promise<void> {
    const token = await AuthGuard.requireToken();
    const projects = await Loader.run(() => this.getActiveProjects(token));

    if (projects.length === 0) {
      Output.info(await t('noProjects'));
      return;
    }

    for (const project of projects) {
      console.log(ProjectFormatter.formatLine(project));
    }
  }
}
