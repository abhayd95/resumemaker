const TemplateSelector = ({ selectedTemplate, colorTheme, onSelect, onThemeChange, onBack }) => {
  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      description: 'Clean and modern design perfect for tech professionals',
      preview: '🎨'
    },
    {
      id: 2,
      name: 'Classic Elegant',
      description: 'Traditional format with elegant styling',
      preview: '📋'
    },
    {
      id: 3,
      name: 'Creative Bold',
      description: 'Eye-catching design for creative professionals',
      preview: '✨'
    },
    {
      id: 4,
      name: 'Two Column',
      description: 'Side-by-side layout with photo support',
      preview: '📄'
    },
    {
      id: 5,
      name: 'Minimalist',
      description: 'Clean and simple design with focus on content',
      preview: '📝'
    },
    {
      id: 6,
      name: 'Sidebar Layout',
      description: 'Professional sidebar design with photo and contact info',
      preview: '📑'
    },
    {
      id: 7,
      name: 'Grid Layout',
      description: 'Modern grid-based layout with organized sections',
      preview: '📊'
    }
  ]

  const colorThemes = [
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'green', label: 'Green', color: '#10b981' },
    { value: 'purple', label: 'Purple', color: '#8b5cf6' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'orange', label: 'Orange', color: '#f97316' }
  ]

  return (
    <div className="template-selector">
      <h2>Choose Your Resume Template</h2>
      <p className="subtitle">Select a template that best represents your style</p>
      
      <div className="templates-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onSelect(template.id)}
          >
            <div className="template-preview">{template.preview}</div>
            <h3>{template.name}</h3>
            <p>{template.description}</p>
            {selectedTemplate === template.id && (
              <div className="selected-badge">✓ Selected</div>
            )}
          </div>
        ))}
      </div>

      {/* Color Theme Selector */}
      {(selectedTemplate === 4 || selectedTemplate === 5 || selectedTemplate === 6 || selectedTemplate === 7) && (
        <div className="color-theme-selector">
          <h3>Choose Color Theme</h3>
          <div className="color-themes-grid">
            {colorThemes.map(theme => (
              <div
                key={theme.value}
                className={`color-theme-card ${colorTheme === theme.value ? 'selected' : ''}`}
                onClick={() => onThemeChange(theme.value)}
                style={{ '--theme-color': theme.color }}
              >
                <div className="color-preview" style={{ backgroundColor: theme.color }}></div>
                <span>{theme.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="template-actions">
        <button onClick={onBack} className="btn-secondary">
          ← Back to Form
        </button>
        <button 
          onClick={() => onSelect(selectedTemplate)} 
          className="btn-primary"
        >
          Generate Resume →
        </button>
      </div>
    </div>
  )
}

export default TemplateSelector

