import { Prec } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { EditorView } from "@codemirror/view";
import { toggleRanges } from "../../commands/ranges";
import { setSectionHeadingLevel } from "../../../../features/source-editor/extensions/toolbar/sections";

// @/features/source-editor/extensions/toolbar/sections

// 左边的是level，右边的是对应的label
// const levels = new Map([
//     ['text', 'Normal text'],
//     ['section', 'Section'],
//     ['subsection', 'Subsection'],
//     ['subsubsection', 'Subsubsection'],
//     ['paragraph', 'Paragraph'],
//     ['subparagraph', 'Subparagraph'],
// ])

const setLevel = (level: string) => {
  return (view: EditorView): boolean => {
    setSectionHeadingLevel(view, level);
    return true;
  };
};

export const shortcuts = () => {
  return Prec.high(
    keymap.of([
      {
        key: "Ctrl-b",
        mac: "Mod-b",
        preventDefault: true,
        run: toggleRanges("\\textbf"),
      },
      {
        key: "Ctrl-i",
        mac: "Mod-i",
        preventDefault: true,
        run: toggleRanges("\\textit"),
      },
      {
        key: "Ctrl-1",
        mac: "Mod-1",
        preventDefault: true,
        run: setLevel("part"),
      },
      {
        key: "Ctrl-2",
        mac: "Mod-2",
        preventDefault: true,
        run: setLevel("chapter"),
      },
      {
        key: "Ctrl-3",
        mac: "Mod-3",
        preventDefault: true,
        run: setLevel("section"),
      },
      {
        key: "Ctrl-4",
        mac: "Mod-4",
        preventDefault: true,
        run: setLevel("subsection"),
      },
      {
        key: "Ctrl-5",
        mac: "Mod-5",
        preventDefault: true,
        run: setLevel("subsubsection"),
      },
      {
        key: "Ctrl-6",
        mac: "Mod-6",
        preventDefault: true,
        run: setLevel("paragraph"),
      },
      {
        key: "Ctrl-7",
        mac: "Mod-7",
        preventDefault: true,
        run: setLevel("subparagraph"),
      },
      {
        key: "Ctrl-8",
        mac: "Mod-8",
        preventDefault: true,
        run: setLevel("subsubparagraph"),
      },
      {
        key: "Ctrl-9",
        mac: "Mod-9",
        preventDefault: true,
        run: setLevel("subsubsubparagraph"),
      },
    ])
  );
};
