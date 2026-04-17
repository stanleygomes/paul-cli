#!/usr/bin/env node

import { HttpManager } from '@api/config/http.config.js';
import { ConfigCommand } from '@commands/config.command.js';
import { InitCommand } from '@commands/init.command.js';
import { ProjectsCommand } from '@commands/projects.command.js';
import { TasksCommand } from '@commands/tasks.command.js';
import { I18n, t } from '@utils/i18n/i18n.util.js';
import { Logger } from '@utils/logger.util.js';
import { Command } from 'commander';
import { BannerRender } from './render/banner.render.js';

async function run() {
  HttpManager.setup();

  const program = new Command();

  program
    .name('paul')
    .description('Paul CLI - Your task assistant')
    .version('1.0.0')
    .hook('preAction', async () => {
      await I18n.initialize();
      BannerRender.render(await t('bannerSubtitle'));
    });

  await I18n.initialize();
  const commands = [
    new InitCommand(program),
    new ConfigCommand(program),
    new TasksCommand(program),
    new ProjectsCommand(program),
  ];

  for (const cmd of commands) {
    await cmd.register();
  }

  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    Logger.error(message);
    process.exitCode = 1;
  }
}

void run();
