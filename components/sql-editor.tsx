"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection, highlightActiveLineGutter } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { sql, PostgreSQL } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { indentOnInput, bracketMatching } from "@codemirror/language";
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { lintGutter, setDiagnostics, type Diagnostic } from "@codemirror/lint";

export interface SqlEditorRef {
  setError: (from: number, to: number, message: string) => void;
  clearError: () => void;
}

interface SqlEditorProps {
  value: string;
  schema: Record<string, string[]>;
  onChange: (value: string) => void;
  onRun: () => void;
}

export const SqlEditor = forwardRef<SqlEditorRef, SqlEditorProps>(
  function SqlEditor({ value, schema, onChange, onRun }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onRunRef = useRef(onRun);
    const onChangeRef = useRef(onChange);

    onRunRef.current = onRun;
    onChangeRef.current = onChange;

    useImperativeHandle(ref, () => ({
      setError(from, to, message) {
        const view = viewRef.current;
        if (!view) return;
        const diagnostic: Diagnostic = { from, to, severity: "error", message };
        view.dispatch(setDiagnostics(view.state, [diagnostic]));
      },
      clearError() {
        const view = viewRef.current;
        if (!view) return;
        view.dispatch(setDiagnostics(view.state, []));
      },
    }));

    // schema が変わったらエディタを再作成（問題切り替え）
    useEffect(() => {
      if (!containerRef.current) return;

      const runKeymap = keymap.of([
        {
          key: "Ctrl-Enter",
          mac: "Mod-Enter",
          run: () => { onRunRef.current(); return true; },
        },
      ]);

      const sqlSchema: Record<string, { label: string }[]> = {};
      for (const [table, cols] of Object.entries(schema)) {
        sqlSchema[table] = cols.map((c) => ({ label: c }));
      }

      const state = EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightActiveLine(),
          drawSelection(),
          history(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          sql({
            dialect: PostgreSQL,
            schema: sqlSchema,
            upperCaseKeywords: true,
          }),
          lintGutter(),
          oneDark,
          runKeymap,
          keymap.of([
            ...closeBracketsKeymap,
            ...completionKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            indentWithTab,
          ]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString());
            }
          }),
          EditorView.theme({
            "&": { height: "100%", fontSize: "14px" },
            ".cm-scroller": {
              overflow: "auto",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            },
            ".cm-tooltip.cm-tooltip-autocomplete": { fontSize: "13px" },
            ".cm-lint-marker-error": { cursor: "default" },
          }),
        ],
      });

      viewRef.current?.destroy();
      viewRef.current = new EditorView({ state, parent: containerRef.current });

      return () => {
        viewRef.current?.destroy();
        viewRef.current = null;
      };
      // schema が変わった時のみ再作成（value は別 useEffect で同期）
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schema]);

    // 外部からの value 変更を反映（問題切り替え・フォーマット時）
    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;
      const current = view.state.doc.toString();
      if (current !== value) {
        view.dispatch({
          changes: { from: 0, to: current.length, insert: value },
        });
      }
    }, [value]);

    return <div ref={containerRef} className="h-full w-full" />;
  }
);
