#!/usr/bin/env node

import { Command } from 'commander';
import { InitCommand } from '@commands/init.command.js';
import { ConfigCommand } from '@commands/config.command.js';
import { TasksCommand } from '@commands/tasks.command.js';
import { Output } from '@utils/output.util.js';
import { I18n, t } from '@utils/i18n/i18n.util.js';
import { HttpManager } from '@api/config/http.config.js';

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

  await I18n.initialize();
  const commands = [
    new InitCommand(program),
    new ConfigCommand(program),
    new TasksCommand(program),
  ];

  for (const cmd of commands) {
    await cmd.register();
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
