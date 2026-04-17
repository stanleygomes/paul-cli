import { z } from 'zod';

export class ProjectValidator {
  public static readonly projectName = z.string().min(1, 'Project name is required');
}
