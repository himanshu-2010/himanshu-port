import { useState, useEffect, memo } from 'react'

const StatusBar = memo(function StatusBar() {
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000))
    }, 5000)
    return () => clearInterval(id)
  }, [])

  function fmt(t) {
    const h = String(Math.floor(t / 3600)).padStart(2, '0')
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0')
    const s = String(t % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  return (
    <div className="status-bar">
      <span className="status-item">
        <span className="status-dot" />
        SYSTEM ONLINE
      </span>
      <span className="status-item status-divider" />
      <span className="status-item">UPTIME {fmt(uptime)}</span>
      <span className="status-item status-divider" />
      <span className="status-item">CPU 23%</span>
      <span className="status-item status-divider" />
      <span className="status-item">MEM 1.2/8G</span>
      <span className="status-item status-divider" />
      <span className="status-item">NET eth0</span>
      <span className="status-item status-divider" />
      <span className="status-item">TEMP 42°C</span>
      <span className="status-item status-divider hide-mobile" />
      <span className="status-item hide-mobile">NODE himanshu@workbench</span>
    </div>
  )
})

export default StatusBar
