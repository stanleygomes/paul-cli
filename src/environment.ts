import 'dotenv/config';

export const TODOIST_API_URL = process.env.TODOIST_API_URL ?? 'https://api.todoist.com/api/v1';
export const MAX_RETRIES = Number(process.env.MAX_RETRIES ?? '3');
