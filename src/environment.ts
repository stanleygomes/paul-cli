import 'dotenv/config';

export const AUTH_API_URL = process.env.PAUL_AUTH_API_URL ?? 'http://localhost:5000/api';

export const CORE_API_URL = process.env.PAUL_CORE_API_URL ?? 'http://localhost:5001/api';

export const TODOIST_API_URL = process.env.TODOIST_API_URL ?? 'https://api.todoist.com/rest/v2';

export const TODOIST_API_TOKEN = process.env.TODOIST_API_TOKEN ?? '';
