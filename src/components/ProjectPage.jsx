import { memo } from 'react'

const ProjectPage = memo(function ProjectPage({ project, onBack }) {
  if (!project) return null

  const statusLabel = project.status.toUpperCase()
  const catLabel = project.category.replace('-', ' / ')

  return (
    <div className="project-page">
      <button onClick={onBack} className="btn-small" style={{ marginBottom: '1.5rem' }}>&larr; Back to Workbench</button>

      {project.id === 'indinotes' && (
        <div className="project-hero">
          <img src="/images/indienotes-logo.png" alt="IndiNotes" className="project-logo" />
        </div>
      )}

      <h1>{project.title}</h1>
      <div className="project-meta">
        <span>{catLabel}</span>
        <span>Status: {statusLabel}</span>
      </div>

      {project.links && (
        <div className="project-links-bar">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-outline">[ View on GitHub &rarr; ]</a>
          )}
          {project.links.app && (
            <a href={project.links.app} target="_blank" rel="noopener noreferrer" className="btn-primary">[ Open App &rarr; ]</a>
          )}
        </div>
      )}

      {project.systemParams && (
        <>
          <h2>System Parameters</h2>
          <table>
            <thead><tr><th>Field</th><th>Value</th></tr></thead>
            <tbody>
              {project.systemParams.map((p, i) => (
                <tr key={i}><td>{p.field}</td><td>{p.value}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {project.features && (
        <>
          <h2>Features</h2>
          <ul className="project-features">
            {project.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </>
      )}

      {project.bom && project.bom.length > 0 && (
        <>
          <h2>Bill of Materials (BOM)</h2>
          <table>
            <thead><tr><th>Component</th><th>Spec</th><th>Qty</th></tr></thead>
            <tbody>
              {project.bom.map((b, i) => (
                <tr key={i}><td>{b.component}</td><td>{b.spec}</td><td>{b.qty}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {project.pinConfig && project.pinConfig.length > 0 && (
        <>
          <h2>Pin Configuration</h2>
          <table>
            <thead><tr><th>Pin</th><th>Connection</th></tr></thead>
            <tbody>
              {project.pinConfig.map((p, i) => (
                <tr key={i}><td>{p.pin}</td><td>{p.connection}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {project.pidSummary && (
        <>
          <h2>PID Control Summary</h2>
          <div className="block-diagram">{project.pidSummary}</div>
        </>
      )}

      {project.blockDiagram && (
        <>
          <h2>System Block Diagram</h2>
          <div className="block-diagram">{project.blockDiagram}</div>
        </>
      )}

      {project.softwareStack && (
        <>
          <h2>Software Stack</h2>
          <table>
            <thead><tr><th>Layer</th><th>Tool</th></tr></thead>
            <tbody>
              {project.softwareStack.map((s, i) => (
                <tr key={i}><td>{s.layer}</td><td>{s.tool}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {project.oledLayout && (
        <>
          <h2>OLED Display Layout</h2>
          <div className="block-diagram">{project.oledLayout}</div>
        </>
      )}

      {project.firmwareSnippet && (
        <>
          <h2>Key Firmware Snippet</h2>
          <div className="code-block">
            <pre>{project.firmwareSnippet.code}</pre>
          </div>
        </>
      )}

      {project.failureLogs && project.failureLogs.length > 0 && (
        <>
          <h2>Failure Analysis Log</h2>
          <table>
            <thead><tr><th>Issue</th><th>Root Cause</th><th>Resolution</th></tr></thead>
            <tbody>
              {project.failureLogs.map((f, i) => (
                <tr key={i}><td>{f.issue}</td><td>{f.cause}</td><td>{f.resolution}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={onBack} className="btn-small">&larr; Back to Workbench</button>
      </div>
    </div>
  )
})

export default ProjectPage
