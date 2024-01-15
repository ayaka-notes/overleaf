import { Prec } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { EditorView } from '@codemirror/view'
import { toggleRanges } from "../../commands/ranges";
import { setSectionHeadingLevel } from "../../../../features/source-editor/extensions/toolbar/sections";
import { useCodeMirrorViewContext } from "../../../../features/source-editor/components/codemirror-editor";

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
  }
}

export const shortcuts = () => {
  const view = useCodeMirrorViewContext();

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
      }
    ])
  );
};
