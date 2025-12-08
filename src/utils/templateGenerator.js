// Template Generator - Creates 1000+ unique template variations

const colorThemes = [
  { name: 'blue', primary: '#3b82f6', secondary: '#1e40af', accent: '#60a5fa' },
  { name: 'green', primary: '#10b981', secondary: '#047857', accent: '#34d399' },
  { name: 'purple', primary: '#8b5cf6', secondary: '#6b21a8', accent: '#a78bfa' },
  { name: 'red', primary: '#ef4444', secondary: '#b91c1c', accent: '#f87171' },
  { name: 'orange', primary: '#f97316', secondary: '#c2410c', accent: '#fb923c' },
  { name: 'teal', primary: '#14b8a6', secondary: '#0d9488', accent: '#5eead4' },
  { name: 'pink', primary: '#ec4899', secondary: '#be185d', accent: '#f472b6' },
  { name: 'indigo', primary: '#6366f1', secondary: '#4338ca', accent: '#818cf8' },
  { name: 'cyan', primary: '#06b6d4', secondary: '#0891b2', accent: '#22d3ee' },
  { name: 'amber', primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' }
]

const layoutStyles = [
  'modern', 'classic', 'minimalist', 'creative', 'professional', 
  'bold', 'elegant', 'tech', 'designer', 'executive'
]

const fontFamilies = [
  'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Verdana',
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins'
]

const generateTemplate = (id) => {
  const colorTheme = colorThemes[id % colorThemes.length]
  const layoutStyle = layoutStyles[Math.floor(id / 100) % layoutStyles.length]
  const fontFamily = fontFamilies[Math.floor(id / 10) % fontFamilies.length]
  
  const variations = [
    { type: 'sidebar-left', width: '30%' },
    { type: 'sidebar-right', width: '30%' },
    { type: 'two-column', columns: 2 },
    { type: 'three-column', columns: 3 },
    { type: 'centered', alignment: 'center' },
    { type: 'asymmetric', layout: 'asymmetric' },
    { type: 'timeline', style: 'timeline' },
    { type: 'card-based', style: 'cards' },
    { type: 'grid', style: 'grid' },
    { type: 'magazine', style: 'magazine' }
  ]
  
  const variation = variations[id % variations.length]
  
  return {
    id: id,
    name: `Template ${id} - ${layoutStyle.charAt(0).toUpperCase() + layoutStyle.slice(1)} ${colorTheme.name.charAt(0).toUpperCase() + colorTheme.name.slice(1)}`,
    description: `A ${layoutStyle} resume template with ${colorTheme.name} color scheme and ${variation.type} layout`,
    colorTheme: colorTheme.name,
    layout: variation.type,
    fontFamily: fontFamily,
    style: layoutStyle,
    colors: colorTheme,
    variation: variation,
    preview: `🎨 ${layoutStyle} • ${colorTheme.name} • ${variation.type}`
  }
}

// Generate 1000+ templates
export const generateTemplates = () => {
  const templates = []
  for (let i = 1; i <= 1000; i++) {
    templates.push(generateTemplate(i))
  }
  return templates
}

// Get template by ID
export const getTemplateById = (id) => {
  if (id <= 7) {
    // Return original templates for IDs 1-7
    return null // Will use existing templates
  }
  return generateTemplate(id)
}

// Get templates by category
export const getTemplatesByCategory = (category) => {
  const allTemplates = generateTemplates()
  return allTemplates.filter(t => 
    t.style === category || 
    t.colorTheme === category ||
    t.layout === category
  )
}

// Search templates
export const searchTemplates = (query) => {
  const allTemplates = generateTemplates()
  const lowerQuery = query.toLowerCase()
  return allTemplates.filter(t => 
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.style.toLowerCase().includes(lowerQuery) ||
    t.colorTheme.toLowerCase().includes(lowerQuery)
  )
}

// Get popular templates (first 50)
export const getPopularTemplates = () => {
  return generateTemplates().slice(0, 50)
}

// Get templates by color
export const getTemplatesByColor = (color) => {
  return generateTemplates().filter(t => t.colorTheme === color)
}

// Get templates by layout
export const getTemplatesByLayout = (layout) => {
  return generateTemplates().filter(t => t.layout === layout)
}

export default {
  generateTemplates,
  getTemplateById,
  getTemplatesByCategory,
  searchTemplates,
  getPopularTemplates,
  getTemplatesByColor,
  getTemplatesByLayout
}

