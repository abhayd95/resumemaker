import { useState } from 'react'

const SectionReorder = ({ sections, onReorder, onClose }) => {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    setHoveredIndex(index)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setHoveredIndex(null)
      return
    }

    const newSections = [...sections]
    const draggedItem = newSections[draggedIndex]
    newSections.splice(draggedIndex, 1)
    newSections.splice(dropIndex, 0, draggedItem)
    
    onReorder(newSections)
    setDraggedIndex(null)
    setHoveredIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setHoveredIndex(null)
  }

  return (
    <div className="section-reorder-modal">
      <div className="section-reorder-content">
        <div className="reorder-header">
          <h2>🔄 Reorder Sections</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>
        <p className="reorder-instructions">
          Drag and drop sections to reorder them. The order will be saved and applied to your resume.
        </p>
        <div className="sections-list">
          {sections.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`section-item ${draggedIndex === index ? 'dragging' : ''} ${hoveredIndex === index && draggedIndex !== index ? 'hovered' : ''}`}
            >
              <div className="drag-handle">☰</div>
              <div className="section-info">
                <span className="section-icon">{section.icon}</span>
                <span className="section-name">{section.name}</span>
              </div>
              <div className="section-position">{index + 1}</div>
            </div>
          ))}
        </div>
        <div className="reorder-actions">
          <button onClick={onClose} className="btn-save-order">
            ✓ Save Order
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SectionReorder

