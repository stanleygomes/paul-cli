import type { Language } from './language.type.js';

export interface CliSettings {
  language: Language;
  activeProjectId?: string;
  activeProjectName?: string;
}
