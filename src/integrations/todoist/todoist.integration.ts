import { TodoistApi } from '@doist/todoist-sdk';
import type { Task } from '@doist/todoist-sdk';

export class TodoistIntegration {
  private readonly api: TodoistApi;

  constructor(token: string) {
    this.api = new TodoistApi(token);
  }

  public async getTasks(): Promise<Task[]> {
    try {
      const response = await this.api.getTasks();
      return response.results;
    } catch {
      throw new Error('errorFetchingTasks');
    }
  }
}
