import type { AiAgent } from '../types/config.type.js';

export const AI_AGENT_CHOICES: { name: string; value: AiAgent }[] = [
  { name: 'GitHub Copilot', value: 'github-copilot' },
  { name: 'Gemini', value: 'gemini' },
  { name: 'Claude code', value: 'claude-code' },
];
