# Instructions — Paul CLI (TypeScript + Node.js)

## Objective

This repository (`paul-cli`) is a command-line interface tool designed to manage tasks and projects via the Todoist API. The goal is to maintain a modular architecture, leveraging TypeScript ESM and strong validation with Zod.

## Stack

- **Runtime:** Node.js (v24)
- **Package Manager:** PNPM
- **Language:** TypeScript (ESM)
- **CLI Framework:** Commander.js
- **HTTP Client:** Axios
- **Validation:** Zod
- **UI:** Chalk, Boxen, Figlet, Ora (spinners), Inquirer.js (prompts)

## How to run locally

1.  **Development:** `pnpm dev` (runs via `tsx`)
2.  **Build:** `pnpm build` (transpiles to `dist/`)
3.  **Lint/Check:**
    - `pnpm lint` / `pnpm lint:fix`
    - `pnpm check-types`
    - `pnpm format:fix`

## Project Map

| Type          | Path                      |
| ------------- | ------------------------- |
| Entry Point   | `src/index.ts`            |
| Commands      | `src/commands/`           |
| API Clients   | `src/api/client/`         |
| API Resources | `src/api/resources/`      |
| Feature Logic | `src/modules/`            |
| Render        | `src/render/`             |
| Services      | `src/services/`           |
| Local Store   | `src/store/`              |
| Validators    | `src/validators/`         |
| Utils         | `src/utils/`              |
| I18n Keys     | `src/utils/i18n/locales/` |
| Types         | `src/types/`              |

## Implementation Principles

1. **Do not scan the whole repo.** Start from `src/index.ts` or the relevant `command` / `module`.
2. **Follow the "Modular Way":**
   - Validation via **Zod schemas** in `src/validators/`
   - Business logic in **Modules** (`src/modules/`)
   - API calls via **Resources** (`src/api/resources/`)
3. **Avoid duplication:** reuse existing structures.
4. **Thin Commands:** Command classes should only register the CLI flags and arguments, delegating the execution to the corresponding Module.
5. **Explicit Imports:** This project uses ESM. **All internal imports MUST include the `.js` extension** (e.g., `import { foo } from './foo.js'`).
6. **Internationalization (i18n):** User-facing messages should use the `t()` helper or `Prompt.ask({ messageKey: ... })`.
7. **Language:** All code (classes, variables, methods) and comments must be in English. **User-facing output must be in Portuguese (via i18n).**

## Naming Conventions

- Commands: `{feature}.command.ts`
- Constants: `{feature}.constant.ts`
- Modules: `{action}-{feature}.module.ts` (e.g., `create-task.module.ts`)
- Stores: `{feature}.store.ts`
- Resources: `{target}.resource.ts`
- Types: `{feature}.type.ts`
- Utils: `{feature}.util.ts`
- Validators: `{target}.validator.ts`

## Checklist for new command/feature

1. Define CLI arguments/flags in `src/commands/`
2. Create Zod schema for input validation in `src/validators/`
3. Implement business logic in `src/modules/`
4. Add necessary i18n keys in `src/utils/i18n/locales/`
5. Register the command in `src/commands/index.ts` (if applicable)

## Commit and Versioning Patterns

- **Language:** Commit messages and documentation must be in English.
- **Commits:** Follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
- **Versioning:** Follow [Semantic Versioning (SemVer)](https://semver.org/).

## What to avoid

- Forgetting `.js` in imports (will break the build).
- Hardcoding strings in Portuguese (always use i18n).
- Fat Commands (keep logic in Modules).

## Most important

- Make it secure and don't make mistakes.
