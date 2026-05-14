// CREATE TABLE 文からテーブル名・カラム名を抽出する
export function parseSchemaForCompletion(schemaSql: string): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  const tableRegex = /CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]*?)\);/gi;
  let match;
  while ((match = tableRegex.exec(schemaSql)) !== null) {
    const tableName = match[1].toLowerCase();
    const body = match[2];
    const columns = body
      .split(",")
      .map((line) => line.trim().split(/\s+/)[0])
      .filter((col) => {
        if (!col) return false;
        const upper = col.toUpperCase();
        return !["PRIMARY", "FOREIGN", "UNIQUE", "CHECK", "CONSTRAINT"].includes(upper);
      })
      .map((col) => col.toLowerCase());
    result[tableName] = columns;
  }
  return result;
}

// PostgreSQL エラーメッセージから文字位置を抽出する
export function parseErrorPosition(errorMessage: string, sql: string): { from: number; to: number } | null {
  // "at or near "TOKEN"" を探してトークン位置を特定
  const nearMatch = errorMessage.match(/at or near "([^"]+)"/);
  if (nearMatch) {
    const token = nearMatch[1];
    const idx = sql.toLowerCase().indexOf(token.toLowerCase());
    if (idx >= 0) {
      return { from: idx, to: idx + token.length };
    }
  }

  // "position: N" (1-indexed) を探す
  const posMatch = errorMessage.match(/position[:\s]+(\d+)/i);
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10) - 1;
    return { from: pos, to: pos + 1 };
  }

  return null;
}
