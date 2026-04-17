import { input, select, password, confirm } from '@inquirer/prompts';
import { t, type DictionaryKey } from '@utils/i18n/i18n.util.js';
import type { AskAndParseParams } from '../types/ask-params.type.js';
import type { SelectAndParseParams } from '../types/select-params.type.js';

export class Prompt {
  public static async ask<T>({
    messageKey,
    schema,
    initialValue,
  }: AskAndParseParams<T>): Promise<T> {
    const message = await t(messageKey);
    const rawValue = initialValue ?? (await input({ message }));
    return schema.parse(rawValue);
  }

  public static async secret<T>({
    messageKey,
    schema,
    initialValue,
  }: AskAndParseParams<T>): Promise<T> {
    const message = await t(messageKey);
    const rawValue = initialValue ?? (await password({ message, mask: '*' }));
    return schema.parse(rawValue);
  }

  public static async select<V>({
    messageKey,
    choices,
    initialValue,
  }: SelectAndParseParams<V>): Promise<V> {
    if (initialValue) return initialValue;

    const message = await t(messageKey);
    return select({
      message,
      choices,
    });
  }

  public static async confirm(
    params: DictionaryKey | { message: string; default?: boolean },
  ): Promise<boolean> {
    if (typeof params === 'string') {
      const message = await t(params);
      return confirm({ message, default: false });
    }
    return confirm({ message: params.message, default: params.default ?? false });
  }
}
