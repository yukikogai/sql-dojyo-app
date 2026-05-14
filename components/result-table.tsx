"use client";

import { QueryResult } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResultTableProps {
  result: QueryResult | null;
  isRunning: boolean;
}

export function ResultTable({ result, isRunning }: ResultTableProps) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          実行中...
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        SQL を実行すると結果がここに表示されます
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-4">
        <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3">
          <p className="text-destructive text-sm font-medium mb-1">エラー</p>
          <pre className="text-destructive/80 text-xs whitespace-pre-wrap">{result.error}</pre>
        </div>
      </div>
    );
  }

  if (result.rows.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground text-sm">結果: 0件 ({result.timeMs}ms)</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {result.rowCount}件 · {result.timeMs}ms
        </span>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted/50">
                {result.columns.map((col) => (
                  <th
                    key={col}
                    className="text-left px-3 py-2 text-xs font-medium text-muted-foreground border border-border"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  {result.columns.map((col) => (
                    <td
                      key={col}
                      className="px-3 py-1.5 border border-border font-mono text-xs"
                    >
                      {row[col] === null ? (
                        <span className="text-muted-foreground italic">NULL</span>
                      ) : (
                        String(row[col])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
