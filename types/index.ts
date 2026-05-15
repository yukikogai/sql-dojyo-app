export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  schema: string;
  solution: string;
  hints: string[];
  explanation?: string; // 正解例の解説
  ordered?: boolean; // 順序を考慮して正誤判定するか
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  error?: string;
  rowCount: number;
  timeMs: number;
}

export type Progress = Record<string, 'solved' | 'attempted'>;
export type Review = Record<string, boolean>;
