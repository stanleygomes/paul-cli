import { BaseResource } from '../base.resource.js';

export interface TodoistTask {
  id: string;
  content: string;
  description: string;
  is_completed: boolean;
  project_id: string;
  due?: {
    date: string;
    string: string;
    lang: string;
    is_recurring: boolean;
  };
}

export interface TodoistProject {
  id: string;
  name: string;
  color: string;
  is_favorite: boolean;
}

export class TodoistResource extends BaseResource {
  async listTasks(): Promise<TodoistTask[]> {
    const response = await this.client.get<TodoistTask[]>('/tasks', this.getRequestConfig());
    return response.data;
  }

  async listProjects(): Promise<TodoistProject[]> {
    const response = await this.client.get<TodoistProject[]>('/projects', this.getRequestConfig());
    return response.data;
  }

  async createTask(task: Partial<TodoistTask>): Promise<TodoistTask> {
    const response = await this.client.post<TodoistTask>('/tasks', task, this.getRequestConfig());
    return response.data;
  }
}
