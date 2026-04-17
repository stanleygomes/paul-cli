import { z } from 'zod';

export class ConfigValidator {
  public static readonly apiKey = z.string().min(1, 'API Key is required');
  public static readonly language = z.enum(['en', 'pt']);
}
