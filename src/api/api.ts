import { TODOIST_API_TOKEN } from '../environment.js';
import { todoistClient } from './client/todoist.client.js';
import { TodoistResource } from './resources/todoist.resource.js';

export class ApiClient {
  public readonly todoist: TodoistResource;

  constructor(_token?: string) {
    this.todoist = new TodoistResource(todoistClient, TODOIST_API_TOKEN);
  }
}

export const createApiClient = (_token?: string) => new ApiClient(_token);
