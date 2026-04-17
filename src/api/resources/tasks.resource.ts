import { BaseResource } from '@api/base.resource.js';
import type { TodoistTask } from '../../types/todoist-task.type.js';
import type { TodoistResponse } from '../../types/todoist-response.type.js';

export class TasksResource extends BaseResource {
  async list(): Promise<TodoistTask[]> {
    const response = await this.client.get<TodoistResponse<TodoistTask>>(
      '/tasks',
      this.getRequestConfig(),
    );
    return response.data.results;
  }

  async create(task: Partial<TodoistTask>): Promise<TodoistTask> {
    const response = await this.client.post<TodoistTask>('/tasks', task, this.getRequestConfig());
    return response.data;
  }
}
