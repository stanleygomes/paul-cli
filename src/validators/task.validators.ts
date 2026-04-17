import { z } from 'zod';

export class TaskValidator {
  public static readonly content = z.string().min(1, 'Task content is required');
}
