import { useState, useEffect } from 'react'
import { initTheme, toggleTheme, getStoredTheme } from '../utils/theme'

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const theme = initTheme()
    setCurrentTheme(theme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const stored = getStoredTheme()
      if (stored === 'system') {
        const newTheme = mediaQuery.matches ? 'dark' : 'light'
        setCurrentTheme(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleToggle = () => {
    const newTheme = toggleTheme(currentTheme)
    setCurrentTheme(newTheme)
  }

  return (
    <button
      onClick={handleToggle}
      className="theme-toggle"
      title={currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle theme"
    >
      {currentTheme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle

