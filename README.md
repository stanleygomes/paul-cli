<div align="center">

# paul-cli

Your terminal task assistant for managing Todoist tasks and projects.

[![npm version](https://img.shields.io/npm/v/paul-cli.svg)](https://www.npmjs.com/package/paul-cli)
[![Node.js Version](https://img.shields.io/badge/node->=18-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

![paul-cli](https://raw.githubusercontent.com/stanleygomes/paul-cli/refs/heads/master/assets/screenshot.png)

`paul-cli` is a powerful and intuitive Command Line Interface designed to help you manage your Todoist tasks, chores, and projects without ever leaving your terminal.

## Installation

Install the npm package globally:

```bash
npm install -g paul-cli
```

## Initial Setup

Before using Paul, you need to initialize the CLI with your configuration (Todoist API Key, language, and AI agent):

```bash
paul init
```

The command will:

1. Ask for your Todoist API Key.
2. Let you choose your preferred language (English or Portuguese).
3. Select your favorite AI Agent.

## Usage

### Commands Overview

| Command                 | Alias                  | Description                                                   |
| :---------------------- | :--------------------- | :------------------------------------------------------------ |
| `paul tasks`            | `paul task`            | Lists your current tasks (filtered by default project if set) |
| `paul tasks create`     | `paul tasks add`       | Creates a new task                                            |
| `paul projects`         | `paul project`         | Lists all your projects                                       |
| `paul projects create`  |                        | Creates a new project                                         |
| `paul projects edit`    | `paul projects update` | Edits a project name                                          |
| `paul projects delete`  | `paul projects rm`     | Deletes a project                                             |
| `paul projects default` |                        | Selects the default project for tasks                         |
| `paul config list`      | `paul config ls`       | Shows your current configuration                              |
| `paul config reset`     | `paul config logout`   | Clears all settings and logs out                              |

## Features

- **Interactive UI**: Powered by `@inquirer/prompts` for a smooth terminal experience.
- **Project Selection**: Easily switch between projects and focus on what matters.
- **Session Management**: Secure login and logout flow.
- **I18n Support**: Available in multiple languages (English and Portuguese).
- **Fast and Lightweight**: Built with TypeScript and optimized for performance.

## Local Development

If you want to contribute or run the project locally:

1. Clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```
4. Run the CLI:
   ```bash
   node dist/index.js
   ```

### Quality Scripts

```bash
# Check formatting, linting, and types
pnpm run check
```

## How to Contribute

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

Made with 🔥 by Lumen HQ
