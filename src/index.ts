#!/usr/bin/env node

import { Command } from 'commander';
import { LoginCommand } from './commands/login.command.js';
import { LogoutCommand } from './commands/logout.command.js';
import { TaskCommand } from './commands/task.command.js';
import { ProjectCommand } from './commands/project.command.js';
import { SettingsCommand } from './commands/settings.command.js';
import { Output } from './utils/output.util.js';
import { I18n, t } from './utils/i18n/i18n.util.js';
import { HttpManager } from './api/config/http.config.js';

async function run() {
  HttpManager.setup();

  const program = new Command();

  program
    .name('paul')
    .description('Paul CLI - Your task assistant')
    .version('1.0.0')
    .hook('preAction', async () => {
      await I18n.initialize();
      Output.banner(await t('bannerSubtitle'));
    });

  const commands = [
    new LoginCommand(program),
    new LogoutCommand(program),
    new TaskCommand(program),
    new ProjectCommand(program),
    new SettingsCommand(program),
  ];

  commands.forEach((cmd) => cmd.register());

  await I18n.initialize();

  if (process.argv.length > 2 && process.argv[2] !== '--help') {
    Output.banner(await t('bannerSubtitle'));
  }

  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    Output.error(message);
    process.exitCode = 1;
  }
}

void run();
