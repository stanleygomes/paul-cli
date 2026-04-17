export interface TodoistResponse<T> {
  results: T[];
  next_cursor?: string | null;
}
