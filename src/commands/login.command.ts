import { LoginModule } from '../modules/auth/login.module.js';
import { BaseCommand } from './base.command.js';

export class LoginCommand extends BaseCommand {
  public register(): void {
    this.program
      .command('login')
      .description('Login with email and verification code')
      .action(LoginModule.run);
  }
}
