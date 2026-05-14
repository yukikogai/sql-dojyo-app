"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProblemSidebar } from "@/components/problem-sidebar";
import { SqlEditor, type SqlEditorRef } from "@/components/sql-editor";
import { ResultTable } from "@/components/result-table";
import { TableViewer } from "@/components/table-viewer";
import { problems } from "@/lib/problems";
import { loadProgress, saveProgress, loadReview, saveReview } from "@/lib/progress";
import { parseSchemaForCompletion, parseErrorPosition } from "@/lib/schema-parser";
import { Progress, QueryResult, Review } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, KeySquare, Lightbulb, Moon, Play, RotateCcw, Sun, WandSparkles, XCircle } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type JudgeStatus = "correct" | "wrong" | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PGliteInstance = any;

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [currentId, setCurrentId] = useState(problems[0].id);
  const [sql, setSql] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [judgeStatus, setJudgeStatus] = useState<JudgeStatus>(null);
  const [progress, setProgress] = useState<Progress>({});
  const [review, setReview] = useState<Review>({});
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isDbReady, setIsDbReady] = useState(false);
  const [db, setDb] = useState<PGliteInstance>(null);

  const dbRef = useRef<PGliteInstance>(null);
  const editorRef = useRef<SqlEditorRef>(null);
  const currentProblem = problems.find((p) => p.id === currentId)!;

  // 問題のスキーマをオートコンプリート用に解析（問題が変わったときだけ再計算）
  const completionSchema = useMemo(
    () => parseSchemaForCompletion(currentProblem.schema),
    [currentProblem.schema]
  );
  const tableNames = useMemo(() => Object.keys(completionSchema), [completionSchema]);

  // 問題文を「課題説明」と「テーブル説明」に分割
  const [taskDesc, tableDesc] = useMemo(() => {
    const marker = "\n### テーブル";
    const idx = currentProblem.description.indexOf(marker);
    if (idx === -1) return [currentProblem.description, ""];
    return [
      currentProblem.description.slice(0, idx),
      currentProblem.description.slice(idx + 1),
    ];
  }, [currentProblem.description]);

  useEffect(() => {
    setProgress(loadProgress());
    setReview(loadReview());
  }, []);

  function toggleReview(id: string) {
    setReview((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveReview(next);
      return next;
    });
  }

  useEffect(() => {
    setIsDbReady(false);
    setDb(null);
    setResult(null);
    setJudgeStatus(null);
    setShowHint(false);
    setHintIndex(0);
    setShowSolution(false);
    setSql("");
    editorRef.current?.clearError();

    let cancelled = false;

    async function init() {
      const { PGlite } = await import("@electric-sql/pglite");
      if (cancelled) return;
      const db = new PGlite();
      await db.exec(currentProblem.schema);
      if (cancelled) return;
      dbRef.current = db;
      setDb(db);
      setIsDbReady(true);
    }

    init();
    return () => {
      cancelled = true;
      dbRef.current = null;
    };
  }, [currentId, currentProblem.schema]);

  const runQuery = useCallback(async () => {
    if (!dbRef.current || !sql.trim()) return;

    setIsRunning(true);
    setJudgeStatus(null);
    editorRef.current?.clearError();

    const start = performance.now();
    try {
      const res = await dbRef.current.query(sql);
      const timeMs = Math.round(performance.now() - start);

      const queryResult: QueryResult = {
        columns: res.fields.map((f: { name: string }) => f.name),
        rows: res.rows,
        rowCount: res.rows.length,
        timeMs,
      };
      setResult(queryResult);
      await judge(queryResult);
    } catch (err) {
      const timeMs = Math.round(performance.now() - start);
      const message = err instanceof Error ? err.message : String(err);
      setResult({ columns: [], rows: [], rowCount: 0, timeMs, error: message });
      setJudgeStatus(null);

      // エラー位置をエディタにアンダーライン表示
      const pos = parseErrorPosition(message, sql);
      if (pos) {
        editorRef.current?.setError(pos.from, pos.to, message);
      }
    } finally {
      setIsRunning(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sql, currentId]);

  async function judge(userResult: QueryResult) {
    if (!dbRef.current || userResult.error) return;
    try {
      const expected = await dbRef.current.query(currentProblem.solution);
      const expectedResult: QueryResult = {
        columns: expected.fields.map((f: { name: string }) => f.name),
        rows: expected.rows,
        rowCount: expected.rows.length,
        timeMs: 0,
      };

      const isCorrect = compareResults(userResult, expectedResult, currentProblem.ordered ?? false);
      setJudgeStatus(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#10b981", "#34d399", "#6ee7b7", "#fff"] });
      }

      setProgress((prev) => {
        if (isCorrect || prev[currentId] !== "solved") {
          const next = { ...prev, [currentId]: isCorrect ? ("solved" as const) : ("attempted" as const) };
          saveProgress(next);
          return next;
        }
        return prev;
      });
    } catch {
      // 判定エラーは無視
    }
  }

  function compareResults(a: QueryResult, b: QueryResult, ordered: boolean): boolean {
    if (a.columns.length !== b.columns.length) return false;
    if (a.rowCount !== b.rowCount) return false;

    // カラム名チェック（大文字小文字を無視、列の順序は問わない）
    const aCols = a.columns.map((c) => c.toLowerCase()).sort();
    const bCols = b.columns.map((c) => c.toLowerCase()).sort();
    if (!aCols.every((c, i) => c === bCols[i])) return false;

    // NULL を空文字と区別するセンチネル
    // 整数表記（小数点なし）はそのまま比較し、小数は10桁精度に丸めて浮動小数点誤差を吸収
    // これにより ROUND なしの AVG 結果("83000.0000000000")と整数("83000")を区別できる
    const normalizeVal = (val: unknown): string => {
      if (val === null || val === undefined) return "\x00NULL\x00";
      const str = String(val).trim();
      const num = Number(str);
      if (str !== "" && isFinite(num)) {
        if (!str.includes(".")) return str;
        return num.toPrecision(10);
      }
      return str;
    };

    // カラム名でアルファベット順ソートして行を文字列化（列の並び順の差を吸収）
    const normalizeRow = (row: Record<string, unknown>, cols: string[]) =>
      [...cols]
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((c) => `${c.toLowerCase()}=${normalizeVal(row[c])}`)
        .join("\x01");

    if (ordered) {
      return a.rows.every((row, i) => normalizeRow(row, a.columns) === normalizeRow(b.rows[i], b.columns));
    }
    const aSet = a.rows.map((r) => normalizeRow(r, a.columns)).sort();
    const bSet = b.rows.map((r) => normalizeRow(r, b.columns)).sort();
    return aSet.every((v, i) => v === bSet[i]);
  }

  async function handleFormat() {
    if (!sql.trim()) return;
    const { format } = await import("sql-formatter");
    setSql(format(sql, { language: "postgresql", keywordCase: "upper", indentStyle: "standard" }));
  }

  const difficultyLabel = { easy: "易", medium: "中", hard: "難" };
  const difficultyClass = {
    easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    hard: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <ProblemSidebar
        problems={problems}
        currentId={currentId}
        progress={progress}
        review={review}
        onSelect={setCurrentId}
        onToggleReview={toggleReview}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* トップバー */}
        <header className="flex-shrink-0 h-10 border-b flex items-center justify-between px-4 bg-muted/20">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium truncate max-w-xs">{currentProblem.title}</h2>
            <Badge
              variant="outline"
              className={cn("text-[10px] px-1.5 py-0", difficultyClass[currentProblem.difficulty])}
            >
              {difficultyLabel[currentProblem.difficulty]}
            </Badge>
            {!isDbReady && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                準備中
              </span>
            )}
          </div>

          {/* テーマ切り替え */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="テーマ切り替え"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </header>

        {/* 問題説明エリア（タブ切り替え） */}
        <div className="flex-shrink-0 border-b flex flex-col" style={{ height: "43%" }}>
          <Tabs defaultValue="problem" className="flex flex-col flex-1 min-h-0">
            <div className="px-4 pt-2 border-b flex-shrink-0 bg-muted/10">
              <TabsList className="h-7 gap-0.5">
                <TabsTrigger value="problem" className="text-xs px-3 h-6">問題</TabsTrigger>
                <TabsTrigger value="tables" className="text-xs px-3 h-6">
                  テーブル
                  {tableNames.length > 0 && (
                    <span className="ml-1 text-[10px] opacity-50">({tableNames.length})</span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="problem" className="flex-1 min-h-0 mt-0 flex">
              {/* 左: 課題説明 + ヒント */}
              <ScrollArea className="flex-1 border-r">
                <div className="px-5 py-4 prose prose-sm dark:prose-invert max-w-none prose-table:text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{taskDesc}</ReactMarkdown>
                </div>
                <div className="px-5 pb-5 space-y-4">
                  {currentProblem.hints.length > 0 && (
                    <div>
                      <Separator className="mb-4" />
                      {!showHint ? (
                        <button
                          onClick={() => setShowHint(true)}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-amber-500 transition-colors"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          ヒントを見る
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500">
                            <Lightbulb className="w-3.5 h-3.5" />
                            ヒント {hintIndex + 1} / {currentProblem.hints.length}
                          </div>
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2.5 text-sm">
                            {currentProblem.hints[hintIndex]}
                          </div>
                          {hintIndex < currentProblem.hints.length - 1 && (
                            <button
                              onClick={() => setHintIndex((i) => i + 1)}
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                              次のヒントを見る →
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 正解例 */}
                  <div>
                    {currentProblem.hints.length === 0 && <Separator className="mb-4" />}
                    {!showSolution ? (
                      <button
                        onClick={() => setShowSolution(true)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-blue-500 transition-colors"
                      >
                        <KeySquare className="w-3.5 h-3.5" />
                        正解例を見る
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-blue-500">
                            <KeySquare className="w-3.5 h-3.5" />
                            正解例
                          </div>
                          <button
                            onClick={() => { setSql(currentProblem.solution); setShowSolution(false); }}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            エディタに貼り付け →
                          </button>
                        </div>
                        <pre className="bg-blue-500/5 border border-blue-500/20 rounded-lg px-3 py-2.5 text-xs font-mono whitespace-pre-wrap break-all">
                          {currentProblem.solution}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>

              {/* 右: テーブル定義 */}
              {tableDesc && (
                <ScrollArea className="w-1/2 flex-shrink-0">
                  <div className="px-5 py-4 prose prose-sm dark:prose-invert max-w-none prose-table:text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{tableDesc}</ReactMarkdown>
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="tables" className="flex-1 min-h-0 mt-0">
              <TableViewer key={currentId} db={db} tableNames={tableNames} />
            </TabsContent>
          </Tabs>
        </div>

        {/* エディタ + 結果 */}
        <div className="flex-1 flex min-h-0">
          {/* SQL エディタ */}
          <div className="flex flex-col w-1/2 border-r">
            <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/10 flex-shrink-0">
              <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">エディタ</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleFormat}
                  disabled={!sql.trim()}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-2 py-1 rounded-md hover:bg-muted"
                >
                  <WandSparkles className="w-3 h-3" />
                  整形
                </button>
                <button
                  onClick={() => { setSql(""); setResult(null); setJudgeStatus(null); editorRef.current?.clearError(); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
                >
                  <RotateCcw className="w-3 h-3" />
                  リセット
                </button>
                <button
                  onClick={runQuery}
                  disabled={!isDbReady || isRunning || !sql.trim()}
                  className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
                >
                  {isRunning ? (
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )}
                  実行
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[9px] opacity-60 font-mono bg-primary-foreground/10 px-1 rounded">
                    ⌘↵
                  </kbd>
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <SqlEditor
                ref={editorRef}
                value={sql}
                schema={completionSchema}
                onChange={setSql}
                onRun={runQuery}
              />
            </div>
          </div>

          {/* 結果パネル */}
          <div className={cn(
            "flex flex-col w-1/2 transition-all duration-300",
            judgeStatus === "correct" && "ring-1 ring-inset ring-emerald-500/30",
            judgeStatus === "wrong" && "ring-1 ring-inset ring-red-500/20",
          )}>
            <div className={cn(
              "flex items-center justify-between px-3 py-2 border-b flex-shrink-0 transition-colors duration-300",
              judgeStatus === "correct" ? "bg-emerald-500/10" :
              judgeStatus === "wrong" ? "bg-red-500/5" :
              "bg-muted/10"
            )}>
              <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">結果</span>

              {judgeStatus === "correct" && (
                <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-semibold animate-in fade-in slide-in-from-right-2 duration-300">
                  <CheckCircle2 className="w-4 h-4" />
                  正解！
                </div>
              )}
              {judgeStatus === "wrong" && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium animate-in fade-in slide-in-from-right-2 duration-300">
                  <XCircle className="w-4 h-4" />
                  不正解
                </div>
              )}
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <ResultTable result={result} isRunning={isRunning} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
