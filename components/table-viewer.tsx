"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TableViewerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any | null;
  tableNames: string[];
}

interface TableData {
  columns: string[];
  rows: Record<string, unknown>[];
}

export function TableViewer({ db, tableNames }: TableViewerProps) {
  const [data, setData] = useState<Record<string, TableData>>({});

  useEffect(() => {
    if (!db || tableNames.length === 0) {
      setData({});
      return;
    }

    let cancelled = false;
    setData({});

    async function fetchAll() {
      const result: Record<string, TableData> = {};
      for (const name of tableNames) {
        if (cancelled) return;
        try {
          const res = await db.query(`SELECT * FROM ${name}`);
          result[name] = {
            columns: res.fields.map((f: { name: string }) => f.name),
            rows: res.rows,
          };
        } catch {
          result[name] = { columns: [], rows: [] };
        }
      }
      if (!cancelled) setData(result);
    }

    fetchAll();
    return () => { cancelled = true; };
  }, [db, tableNames]);

  if (tableNames.length === 0) {
    return <div className="p-4 text-sm text-muted-foreground">テーブルがありません</div>;
  }

  return (
    <Tabs defaultValue={tableNames[0]} className="flex flex-col h-full">
      <div className="px-4 pt-3 border-b flex-shrink-0">
        <TabsList className="h-7">
          {tableNames.map((name) => (
            <TabsTrigger key={name} value={name} className="text-xs px-3 h-6">
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tableNames.map((name) => {
        const table = data[name];
        return (
          <TabsContent key={name} value={name} className="flex-1 min-h-0 mt-0">
            {!table ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  読み込み中...
                </div>
              </div>
            ) : table.columns.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground">データを取得できませんでした</div>
            ) : (
              <ScrollArea className="h-full">
                <div className="p-3">
                  <p className="text-xs text-muted-foreground mb-2">{table.rows.length} 件</p>
                  <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        {table.columns.map((col, colIndex) => (
                          <th
                            key={colIndex}
                            className="text-left px-3 py-2 text-xs font-medium text-muted-foreground border border-border whitespace-nowrap"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          {table.columns.map((col, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-3 py-1.5 border border-border font-mono text-xs whitespace-nowrap"
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
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
