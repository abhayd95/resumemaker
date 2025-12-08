import { useState, useMemo } from 'react'
import { generateTemplates, searchTemplates, getTemplatesByColor, getTemplatesByLayout } from '../utils/templateGenerator'

const TemplateSelectorWith1000 = ({ selectedTemplate, colorTheme, onSelect, onThemeChange, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterColor, setFilterColor] = useState('all')
  const [filterLayout, setFilterLayout] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const templatesPerPage = 12

  // Original 7 templates
  const originalTemplates = [
    { id: 1, name: 'Modern Professional', description: 'Clean and modern design perfect for tech professionals', preview: '🎨' },
    { id: 2, name: 'Classic Elegant', description: 'Traditional format with elegant styling', preview: '📋' },
    { id: 3, name: 'Creative Bold', description: 'Eye-catching design for creative professionals', preview: '✨' },
    { id: 4, name: 'Two Column', description: 'Side-by-side layout with photo support', preview: '📄' },
    { id: 5, name: 'Minimalist', description: 'Clean and simple design with focus on content', preview: '📝' },
    { id: 6, name: 'Sidebar Layout', description: 'Professional sidebar design with photo and contact info', preview: '📑' },
    { id: 7, name: 'Grid Layout', description: 'Modern grid-based layout with organized sections', preview: '📊' }
  ]

  // Get generated templates
  const generatedTemplates = useMemo(() => {
    let templates = generateTemplates()
    
    if (searchQuery) {
      templates = searchTemplates(searchQuery)
    } else if (filterColor !== 'all') {
      templates = getTemplatesByColor(filterColor)
    } else if (filterLayout !== 'all') {
      templates = getTemplatesByLayout(filterLayout)
    }
    
    return templates
  }, [searchQuery, filterColor, filterLayout])

  // Combine original and generated templates
  const allTemplates = useMemo(() => {
    return [...originalTemplates, ...generatedTemplates]
  }, [generatedTemplates])

  // Pagination
  const totalPages = Math.ceil(allTemplates.length / templatesPerPage)
  const startIndex = (currentPage - 1) * templatesPerPage
  const endIndex = startIndex + templatesPerPage
  const currentTemplates = allTemplates.slice(startIndex, endIndex)

  const colorThemes = [
    { value: 'all', label: 'All Colors' },
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'green', label: 'Green', color: '#10b981' },
    { value: 'purple', label: 'Purple', color: '#8b5cf6' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'orange', label: 'Orange', color: '#f97316' },
    { value: 'teal', label: 'Teal', color: '#14b8a6' },
    { value: 'pink', label: 'Pink', color: '#ec4899' },
    { value: 'indigo', label: 'Indigo', color: '#6366f1' }
  ]

  const layoutTypes = [
    { value: 'all', label: 'All Layouts' },
    { value: 'sidebar-left', label: 'Sidebar Left' },
    { value: 'sidebar-right', label: 'Sidebar Right' },
    { value: 'two-column', label: 'Two Column' },
    { value: 'centered', label: 'Centered' },
    { value: 'timeline', label: 'Timeline' },
    { value: 'card-based', label: 'Card Based' }
  ]

  return (
    <div className="template-selector">
      <h2>Choose Your Resume Template</h2>
      <p className="subtitle">Select from 1000+ professional templates</p>
      
      {/* Search and Filters */}
      <div className="template-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search templates..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="template-search-input"
          />
        </div>
        
        <div className="filter-group">
          <select
            value={filterColor}
            onChange={(e) => {
              setFilterColor(e.target.value)
              setCurrentPage(1)
            }}
            className="filter-select"
          >
            {colorThemes.map(theme => (
              <option key={theme.value} value={theme.value}>{theme.label}</option>
            ))}
          </select>
          
          <select
            value={filterLayout}
            onChange={(e) => {
              setFilterLayout(e.target.value)
              setCurrentPage(1)
            }}
            className="filter-select"
          >
            {layoutTypes.map(layout => (
              <option key={layout.value} value={layout.value}>{layout.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Template Count */}
      <div className="template-count">
        Showing {currentTemplates.length} of {allTemplates.length} templates
      </div>
      
      <div className="templates-grid">
        {currentTemplates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onSelect(template.id)}
          >
            <div className="template-preview">{template.preview || '📄'}</div>
            <h3>{template.name}</h3>
            <p>{template.description}</p>
            {selectedTemplate === template.id && (
              <div className="selected-badge">✓ Selected</div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {/* Color Theme Selector */}
      {(selectedTemplate === 4 || selectedTemplate === 5 || selectedTemplate === 6 || selectedTemplate === 7 || selectedTemplate > 7) && (
        <div className="color-theme-selector">
          <h3>Choose Color Theme</h3>
          <div className="color-themes-grid">
            {colorThemes.slice(1).map(theme => (
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

export default TemplateSelectorWith1000

