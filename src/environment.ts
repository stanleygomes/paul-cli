import 'dotenv/config';

export const TODOIST_API_URL = process.env.TODOIST_API_URL ?? 'https://api.todoist.com/rest/v2';
export const TODOIST_API_TOKEN = process.env.TODOIST_API_TOKEN ?? '';
