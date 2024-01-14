import { Prec } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { toggleRanges } from '../../commands/ranges'

export const shortcuts = () => {
  return Prec.high(
    keymap.of([
      {
        key: 'Ctrl-b',
        mac: 'Mod-b',
        preventDefault: true,
        run: toggleRanges('\\textbf'),
      },
      {
        key: 'Ctrl-i',
        mac: 'Mod-i',
        preventDefault: true,
        run: toggleRanges('\\textit'),
      },
      {
        key: 'Ctrl-1',
        mac: 'Mod-1',
        preventDefault: true,
        run: toggleRanges('\\part'),
      },
      {
        key: 'Ctrl-2',
        mac: 'Mod-2',
        preventDefault: true,
        run: toggleRanges('\\chapter'),
      },
      {
        key: 'Ctrl-3',
        mac: 'Mod-3',
        preventDefault: true,
        run: toggleRanges('\\section'),
      },
      {
        key: 'Ctrl-4',
        mac: 'Mod-4',
        preventDefault: true,
        run: toggleRanges('\\subsection'),
      },
      {
        key: 'Ctrl-5',
        mac: 'Mod-5',
        preventDefault: true,
        run: toggleRanges('\\subsubsection'),
      },
      {
        key: 'Ctrl-6',
        mac: 'Mod-6',
        preventDefault: true,
        run: toggleRanges('\\paragraph'),
      }
    ])
  )
}
