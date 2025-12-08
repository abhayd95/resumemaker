// Theme management utility
export const themes = {
  light: 'light',
  dark: 'dark'
}

export const getStoredTheme = () => {
  return localStorage.getItem('theme') || themes.light
}

export const setStoredTheme = (theme) => {
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

export const getSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return themes.dark
  }
  return themes.light
}

export const initTheme = () => {
  const stored = getStoredTheme()
  const system = getSystemTheme()
  const theme = stored === 'system' ? system : stored
  setStoredTheme(theme)
  return theme
}

export const toggleTheme = (currentTheme) => {
  const newTheme = currentTheme === themes.light ? themes.dark : themes.light
  setStoredTheme(newTheme)
  return newTheme
}

