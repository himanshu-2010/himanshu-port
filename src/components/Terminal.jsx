import { useEffect, useRef, useState } from 'react'

export default function Terminal({ lines }) {
  const bodyRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    body.innerHTML = ''
    let totalDelay = 0

    lines.forEach((line, idx) => {
      totalDelay += line.delay || 200
      const timeout = setTimeout(() => {
        const div = document.createElement('div')
        div.className = 'terminal-line'
        if (line.class) div.classList.add(line.class)
        div.textContent = line.text

        if (line.isLast) {
          const cursor = document.createElement('span')
          cursor.className = 'terminal-cursor'
          div.appendChild(cursor)
        }

        body.appendChild(div)
        requestAnimationFrame(() => div.classList.add('visible'))
        body.scrollTop = body.scrollHeight
      }, totalDelay)
    })

    setVisible(true)
    return () => {}
  }, [lines])

  return (
    <div className="hero-terminal">
      <div className="terminal-header">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title">himanshu@workbench:~/portfolio</span>
      </div>
      <div className="terminal-body" ref={bodyRef}></div>
    </div>
  )
}
