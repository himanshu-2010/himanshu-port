import { useEffect, useRef, memo } from 'react'

const Counter = memo(function Counter({ value, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = value
          const duration = 1800
          const step = target / (duration / 16)
          let current = 0
          const timer = setInterval(() => {
            current += step
            if (current >= target) { current = target; clearInterval(timer) }
            el.textContent = formatNumber(Math.floor(current)) + (suffix || '')
          }, 16)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, suffix])

  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
    if (n >= 1000) return n.toLocaleString()
    return n.toString()
  }

  return <span className="metric-value" ref={ref}>0</span>
})

const Metrics = memo(function Metrics({ metrics }) {
  return (
    <section className="metrics-section" id="metrics">
      <div className="metrics-grid">
        {metrics.map((m, i) => (
          <div key={i}>
            <Counter value={m.value} suffix={m.suffix} />
            <span className="metric-label">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
})

export default Metrics
