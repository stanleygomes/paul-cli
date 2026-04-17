import type { DictionaryKey } from '../utils/i18n/i18n.util.js';

export interface SelectAndParseParams<V> {
  messageKey: DictionaryKey;
  choices: { name: string; value: V }[];
  initialValue?: V | null;
}
