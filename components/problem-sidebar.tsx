"use client";

import { Problem, Progress, Review } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookMarked, CheckCircle2, Circle, MinusCircle } from "lucide-react";

interface ProblemSidebarProps {
  problems: Problem[];
  currentId: string;
  progress: Progress;
  review: Review;
  onSelect: (id: string) => void;
  onToggleReview: (id: string) => void;
}

const difficultyLabel: Record<Problem["difficulty"], string> = {
  easy: "易",
  medium: "中",
  hard: "難",
};

const difficultyClass: Record<Problem["difficulty"], string> = {
  easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

const difficultyGroupLabel: Record<Problem["difficulty"], string> = {
  easy: "易しい",
  medium: "普通",
  hard: "難しい",
};

const difficultyGroupClass: Record<Problem["difficulty"], string> = {
  easy: "text-emerald-500",
  medium: "text-amber-500",
  hard: "text-red-500",
};

const DIFFICULTY_ORDER: Problem["difficulty"][] = ["easy", "medium", "hard"];

export function ProblemSidebar({ problems, currentId, progress, review, onSelect, onToggleReview }: ProblemSidebarProps) {
  const solved = Object.values(progress).filter((s) => s === "solved").length;
  const total = problems.length;
  const pct = Math.round((solved / total) * 100);

  const r = 16;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const grouped = DIFFICULTY_ORDER.map((diff) => ({
    difficulty: diff,
    items: problems.filter((p) => p.difficulty === diff),
  }));

  return (
    <aside className="w-60 flex-shrink-0 border-r bg-background flex flex-col">
      {/* ヘッダー */}
      <div className="px-4 py-5 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg tracking-tight">SQL道場</h1>
            <p className="text-xs text-muted-foreground mt-0.5">PostgreSQL 練習</p>
          </div>
          {/* 進捗リング */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="3"
                className="text-muted/40" />
              <circle cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="3"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round"
                className="text-emerald-500 transition-all duration-700"
              />
            </svg>
            <span className="absolute text-[11px] font-semibold tabular-nums">{pct}%</span>
          </div>
        </div>

        {/* 進捗バー */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>進捗</span>
            <span className="font-medium text-foreground">{solved} / {total} 問</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 問題リスト（難易度グループ） */}
      <nav className="flex-1 overflow-y-auto py-2">
        {grouped.map(({ difficulty, items }) => (
          <div key={difficulty}>
            {/* グループヘッダー */}
            <div className={cn(
              "px-4 pt-3 pb-1 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase",
              difficultyGroupClass[difficulty]
            )}>
              <Badge
                variant="outline"
                className={cn("text-[10px] px-1.5 py-0 h-4", difficultyClass[difficulty])}
              >
                {difficultyLabel[difficulty]}
              </Badge>
              {difficultyGroupLabel[difficulty]}
              <span className="ml-auto text-muted-foreground font-normal normal-case">
                {items.filter((p) => progress[p.id] === "solved").length}/{items.length}
              </span>
            </div>

            {items.map((p, groupIndex) => {
              const status = progress[p.id];
              const isActive = currentId === p.id;
              const isReview = review[p.id] ?? false;
              return (
                <div key={p.id} className={cn(
                  "relative flex items-center group",
                  "hover:bg-muted/50",
                  isActive && "bg-muted/60"
                )}>
                  {/* アクティブインジケーター */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
                  )}

                  {/* 問題選択ボタン */}
                  <button
                    onClick={() => onSelect(p.id)}
                    className="flex-1 text-left px-4 py-2.5 text-sm transition-all duration-150 min-w-0"
                  >
                    <div className="flex items-start gap-2.5">
                      {/* ステータスアイコン */}
                      <span className="mt-0.5 flex-shrink-0">
                        {status === "solved" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : status === "attempted" ? (
                          <MinusCircle className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground/30" />
                        )}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className={cn(
                            "text-xs font-medium flex-shrink-0",
                            isActive ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {groupIndex + 1}.
                          </span>
                          <span className={cn(
                            "truncate text-xs",
                            isActive ? "text-foreground font-medium" : "text-muted-foreground"
                          )}>
                            {p.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* 復習チェックボタン */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleReview(p.id); }}
                    title={isReview ? "復習マークを外す" : "復習マークをつける"}
                    className={cn(
                      "flex-shrink-0 pr-3 pl-1 py-2.5 transition-colors",
                      isReview
                        ? "text-violet-400"
                        : "text-muted-foreground/20 group-hover:text-muted-foreground/50"
                    )}
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
