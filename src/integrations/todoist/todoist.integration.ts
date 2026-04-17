import { TodoistApi } from '@doist/todoist-sdk';
import type { Task } from '@doist/todoist-sdk';

export class TodoistIntegration {
  private readonly api: TodoistApi;

  constructor(
    private readonly token: string,
    private readonly debug: boolean = false,
  ) {
    this.api = new TodoistApi(token);
  }

  public async getTasks(): Promise<Task[]> {
    try {
      const response = await this.api.getTasks();
      return response.results;
    } catch (error) {
      if (this.debug) {
        throw error;
      }

      throw new Error('errorFetchingTasks', { cause: error });
    }
  }
}
