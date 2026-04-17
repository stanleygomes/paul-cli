import os from 'node:os';
import path from 'node:path';

export class PathProvider {
  public static readonly homeDir = path.join(os.homedir(), '.paul-cli');
  public static readonly configFile = path.join(PathProvider.homeDir, 'config.json');
}
