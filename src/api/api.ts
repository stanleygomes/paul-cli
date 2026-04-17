import { authClient } from './client/auth.client.js';
import { coreClient } from './client/core.client.js';
import { AuthResource } from './resources/auth.resource.js';
import { ProjectResource } from './resources/project.resource.js';
import { TaskResource } from './resources/task.resource.js';

export class ApiClient {
  public readonly auth: AuthResource;
  public readonly project: ProjectResource;
  public readonly task: TaskResource;

  constructor(token?: string) {
    this.auth = new AuthResource(authClient, token);
    this.project = new ProjectResource(coreClient, token);
    this.task = new TaskResource(coreClient, token);
  }
}

export const createApiClient = (token?: string) => new ApiClient(token);
