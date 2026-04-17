import { LogoutModule } from '../modules/auth/logout.module.js';
import { BaseCommand } from './base.command.js';

export class LogoutCommand extends BaseCommand {
  public register(): void {
    this.program.command('logout').description('Clear local session data').action(LogoutModule.run);
  }
}
