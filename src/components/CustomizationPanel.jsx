import { useState } from 'react'

const CustomizationPanel = ({ 
  colorTheme, 
  onColorThemeChange, 
  customColor, 
  onCustomColorChange,
  selectedFont,
  onFontChange,
  fontSize,
  onFontSizeChange,
  previewMode,
  onPreviewModeChange,
  onClose 
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontPanel, setShowFontPanel] = useState(false)
  const [showPreviewModes, setShowPreviewModes] = useState(false)

  const fonts = [
    { name: 'Segoe UI', value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Times New Roman', value: "'Times New Roman', Times, serif" },
    { name: 'Calibri', value: 'Calibri, sans-serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
    { name: 'Roboto', value: "'Roboto', sans-serif" },
    { name: 'Open Sans', value: "'Open Sans', sans-serif" },
    { name: 'Lato', value: "'Lato', sans-serif" }
  ]

  const colorThemes = [
    { name: 'Blue', value: 'blue', color: '#667eea' },
    { name: 'Green', value: 'green', color: '#48bb78' },
    { name: 'Purple', value: 'purple', color: '#9f7aea' },
    { name: 'Red', value: 'red', color: '#f56565' },
    { name: 'Orange', value: 'orange', color: '#ed8936' },
    { name: 'Teal', value: 'teal', color: '#38b2ac' },
    { name: 'Pink', value: 'pink', color: '#ed64a6' },
    { name: 'Custom', value: 'custom', color: customColor || '#667eea' }
  ]

  const previewModes = [
    { name: 'Desktop', value: 'desktop', icon: '🖥️', description: 'Standard desktop view' },
    { name: 'Mobile', value: 'mobile', icon: '📱', description: 'Mobile device view' },
    { name: 'Print', value: 'print', icon: '🖨️', description: 'Print-optimized view' },
    { name: 'ATS Scanner', value: 'ats', icon: '📄', description: 'ATS-friendly view' }
  ]

  const industryColorPalettes = [
    { name: 'Tech', colors: ['#667eea', '#764ba2', '#f093fb'] },
    { name: 'Finance', colors: ['#2d3748', '#4a5568', '#718096'] },
    { name: 'Healthcare', colors: ['#38b2ac', '#48bb78', '#81e6d9'] },
    { name: 'Creative', colors: ['#ed64a6', '#9f7aea', '#f093fb'] },
    { name: 'Corporate', colors: ['#2c5282', '#2b6cb0', '#3182ce'] }
  ]

  return (
    <div className="customization-panel">
      <div className="customization-header">
        <h2>🎨 Customize Your Resume</h2>
        <button onClick={onClose} className="btn-close">✕</button>
      </div>

      <div className="customization-content">
        {/* Preview Modes */}
        <div className="customization-section">
          <div className="section-header" onClick={() => setShowPreviewModes(!showPreviewModes)}>
            <h3>👁️ Preview Mode</h3>
            <span className="toggle-icon">{showPreviewModes ? '▼' : '▶'}</span>
          </div>
          {showPreviewModes && (
            <div className="section-content">
              <div className="preview-modes-grid">
                {previewModes.map(mode => (
                  <button
                    key={mode.value}
                    onClick={() => onPreviewModeChange(mode.value)}
                    className={`preview-mode-btn ${previewMode === mode.value ? 'active' : ''}`}
                    title={mode.description}
                  >
                    <span className="mode-icon">{mode.icon}</span>
                    <span className="mode-name">{mode.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Font Selection */}
        <div className="customization-section">
          <div className="section-header" onClick={() => setShowFontPanel(!showFontPanel)}>
            <h3>🔤 Font Selection</h3>
            <span className="toggle-icon">{showFontPanel ? '▼' : '▶'}</span>
          </div>
          {showFontPanel && (
            <div className="section-content">
              <div className="font-selector">
                <label>Font Family:</label>
                <select 
                  value={selectedFont} 
                  onChange={(e) => onFontChange(e.target.value)}
                  className="font-select"
                >
                  {fonts.map(font => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="font-size-selector">
                <label>Font Size:</label>
                <div className="font-size-buttons">
                  <button
                    onClick={() => onFontSizeChange('small')}
                    className={`size-btn ${fontSize === 'small' ? 'active' : ''}`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => onFontSizeChange('medium')}
                    className={`size-btn ${fontSize === 'medium' ? 'active' : ''}`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => onFontSizeChange('large')}
                    className={`size-btn ${fontSize === 'large' ? 'active' : ''}`}
                  >
                    Large
                  </button>
                </div>
              </div>
              <div className="font-preview">
                <p style={{ fontFamily: selectedFont, fontSize: fontSize === 'small' ? '0.9rem' : fontSize === 'large' ? '1.1rem' : '1rem' }}>
                  This is how your resume will look with {fonts.find(f => f.value === selectedFont)?.name} font.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Color Schemes */}
        <div className="customization-section">
          <div className="section-header" onClick={() => setShowColorPicker(!showColorPicker)}>
            <h3>🎨 Color Scheme</h3>
            <span className="toggle-icon">{showColorPicker ? '▼' : '▶'}</span>
          </div>
          {showColorPicker && (
            <div className="section-content">
              <div className="color-themes">
                <label>Theme Colors:</label>
                <div className="theme-colors-grid">
                  {colorThemes.map(theme => (
                    <button
                      key={theme.value}
                      onClick={() => {
                        if (theme.value === 'custom') {
                          setShowColorPicker(true)
                        } else {
                          onColorThemeChange(theme.value)
                          onCustomColorChange(null)
                        }
                      }}
                      className={`theme-color-btn ${colorTheme === theme.value ? 'active' : ''}`}
                      style={{ 
                        background: theme.color,
                        border: colorTheme === theme.value ? '3px solid #333' : '2px solid #ddd'
                      }}
                      title={theme.name}
                    >
                      {theme.value === 'custom' && '🎨'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="custom-color-picker">
                <label>Custom Color:</label>
                <div className="color-picker-wrapper">
                  <input
                    type="color"
                    value={customColor || '#667eea'}
                    onChange={(e) => {
                      onCustomColorChange(e.target.value)
                      onColorThemeChange('custom')
                    }}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={customColor || '#667eea'}
                    onChange={(e) => {
                      if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                        onCustomColorChange(e.target.value)
                        onColorThemeChange('custom')
                      }
                    }}
                    className="color-text-input"
                    placeholder="#667eea"
                  />
                </div>
              </div>

              <div className="industry-palettes">
                <label>Industry Color Palettes:</label>
                <div className="palettes-grid">
                  {industryColorPalettes.map(palette => (
                    <div key={palette.name} className="palette-item">
                      <div className="palette-colors">
                        {palette.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="palette-color"
                            style={{ background: color }}
                            onClick={() => {
                              onCustomColorChange(color)
                              onColorThemeChange('custom')
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                      <span className="palette-name">{palette.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomizationPanel

