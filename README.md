<div align="center">

# paul-cli

Your terminal task assistant for managing Todoist tasks and projects.

[![npm version](https://img.shields.io/npm/v/paul-cli.svg)](https://www.npmjs.com/package/paul-cli)
[![Node.js Version](https://img.shields.io/badge/node->=18-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

`paul-cli` is a powerful and intuitive Command Line Interface designed to help you manage your Todoist tasks, chores, and projects without ever leaving your terminal.

## Installation

Install the npm package globally:

```bash
npm install -g paul-cli
```

## Initial Setup

Before using Paul, you need to authenticate with your Todoist account:

```bash
paul login
```

The command will:
1. Ask for your email.
2. Send a 6-digit verification code.
3. Securely store your session for future use.

## Usage

### Commands Overview

| Command | Description |
| :--- | :--- |
| `paul task list` | Lists your current tasks |
| `paul task create` | Creates a new task |
| `paul task edit` | Edits an existing task |
| `paul task delete` | Deletes a task |
| `paul project list` | Lists all your projects |
| `paul project create` | Creates a new project |
| `paul project edit` | Edits a project |
| `paul project delete` | Deletes a project |
| `paul project use` | Sets an active project for the current session |
| `paul settings` | Manages CLI settings (e.g., language) |
| `paul logout` | Clears your local session |

### Examples

#### Managing Tasks
```bash
# List all tasks
paul task list

# Create a new task with a title
paul task create "Buy milk"

# Delete a specific task
paul task delete <taskId>
```

#### Managing Projects
```bash
# List all projects
paul project list

# Set an active project for your terminal session
paul project use
```

To see more details and options for any command, run:

```bash
paul help
```

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
