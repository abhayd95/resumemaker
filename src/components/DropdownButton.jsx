import { useState, useRef, useEffect } from 'react'

const DropdownButton = ({ 
  label, 
  icon, 
  options = [], 
  onSelect, 
  className = '',
  buttonClassName = '',
  align = 'left' // 'left', 'right', 'center'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option) => {
    if (onSelect) {
      onSelect(option)
    }
    setIsOpen(false)
  }

  return (
    <div className={`dropdown-button-wrapper ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`dropdown-button ${buttonClassName} ${isOpen ? 'active' : ''}`}
      >
        <span className="dropdown-content">
          {icon && <span className="dropdown-icon">{icon}</span>}
          <span className="dropdown-label">{label}</span>
        </span>
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className={`dropdown-menu ${align}`}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`dropdown-item ${option.disabled ? 'disabled' : ''} ${option.danger ? 'danger' : ''}`}
              disabled={option.disabled}
              title={option.description || option.label}
            >
              {option.icon && <span className="item-icon">{option.icon}</span>}
              <div className="item-content">
                <span className="item-label">{option.label}</span>
                {option.description && (
                  <span className="item-description">{option.description}</span>
                )}
              </div>
              {option.shortcut && (
                <span className="item-shortcut">{option.shortcut}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownButton

