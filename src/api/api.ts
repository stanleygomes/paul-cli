import { todoistClient } from '@api/client/todoist.client.js';
import { TasksResource } from '@api/resources/tasks.resource.js';
import { ProjectsResource } from '@api/resources/projects.resource.js';

export class ApiClient {
  public readonly tasks: TasksResource;
  public readonly projects: ProjectsResource;

  constructor(token: string) {
    this.tasks = new TasksResource(todoistClient, token);
    this.projects = new ProjectsResource(todoistClient, token);
  }
}

export const createApiClient = (token: string) => new ApiClient(token);
