import type { CliConfig } from '../types/config.type.js';
import { PathProvider } from '@utils/path.util.js';
import { JsonStorage } from '@utils/json-storage.util.js';

export class ConfigStore {
  constructor(private readonly filePath: string) {}

  async get(): Promise<CliConfig | null> {
    return JsonStorage.read<CliConfig>(this.filePath);
  }

  async save(config: CliConfig): Promise<void> {
    await JsonStorage.write(this.filePath, config);
  }

  async clear(): Promise<void> {
    await JsonStorage.delete(this.filePath);
  }
}

export const configStore = new ConfigStore(PathProvider.configFile);
