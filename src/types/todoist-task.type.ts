export interface TodoistTask {
  id: string;
  content: string;
  description: string;
  checked: boolean;
  project_id: string;
  priority: number;
  due?: {
    date: string;
    string: string;
    lang: string;
    is_recurring: boolean;
  };
}
