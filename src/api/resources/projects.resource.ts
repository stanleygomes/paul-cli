import { BaseResource } from '@api/base.resource.js';
import type { TodoistProject } from '../../types/todoist-project.type.js';
import type { TodoistResponse } from '../../types/todoist-response.type.js';

export class ProjectsResource extends BaseResource {
  async list(): Promise<TodoistProject[]> {
    const response = await this.client.get<TodoistResponse<TodoistProject>>(
      '/projects',
      this.getRequestConfig(),
    );
    return response.data.results;
  }
}
