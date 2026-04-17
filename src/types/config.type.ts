import type { Language } from './language.type.js';

export type AiAgent = 'github-copilot' | 'gemini' | 'claude-code';

export interface CliConfig {
  apiKey: string;
  aiAgent: AiAgent;
  language: Language;
  debug?: boolean;
  defaultProjectId?: string;
}
