import PropTypes from 'prop-types'
import SymbolPaletteContent from './symbol-palette-content'

export default function SymbolPalette({ show }) {
  if (!show) {
    return null
  }

  const handleSelect = (symbol) =>{
    window.dispatchEvent(
      new CustomEvent('editor:insert-symbol', {
        detail: symbol,
      })
    )
  }

  return <SymbolPaletteContent handleSelect={handleSelect} />
}
SymbolPalette.propTypes = {
  show: PropTypes.bool,
}
