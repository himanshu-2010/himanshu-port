import { useState, useMemo, useCallback } from 'react'

export default function Quotes({ quotes }) {
  const [history, setHistory] = useState(() => {
    const i = Math.floor(Math.random() * quotes.length)
    return [i]
  })
  const [cursor, setCursor] = useState(0)

  const current = quotes[history[cursor]]

  const canPrev = cursor > 0
  const canNext = cursor < history.length - 1

  const shuffle = useCallback(() => {
    let i
    do {
      i = Math.floor(Math.random() * quotes.length)
    } while (i === history[cursor] && quotes.length > 1)
    const trimmed = history.slice(0, cursor + 1)
    const next = [...trimmed, i]
    if (next.length > 5) next.shift()
    setHistory(next)
    setCursor(next.length - 1)
  }, [history, cursor, quotes.length])

  function prev() {
    if (canPrev) setCursor(c => c - 1)
  }

  function next() {
    if (canNext) setCursor(c => c + 1)
  }

  return (
    <section className="section quotes-section" id="quotes">
      <div className="container">
        <span className="section-label">// QUOTES</span>

        <div className="quotes-card" onClick={shuffle}>
          <p className="quotes-text">&ldquo;{current.text}&rdquo;</p>
          <span className="quotes-author">&mdash; {current.author}</span>
          <span className="quotes-hint">click for another quote</span>
        </div>

        <div className="quotes-nav">
          <button className="quotes-btn" disabled={!canPrev} onClick={prev}>&larr; Prev</button>
          <span className="quotes-counter">{cursor + 1} / {history.length}</span>
          <button className="quotes-btn" disabled={!canNext} onClick={next}>Next &rarr;</button>
        </div>
      </div>
    </section>
  )
}
