// Resume Sharing Utility
export const generateShareLink = (resumeId, userName) => {
  const baseUrl = window.location.origin
  return `${baseUrl}/share/${userName}/${resumeId}`
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

export const shareViaEmail = (subject, body) => {
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailtoLink
}

export const shareViaWhatsApp = (text) => {
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(whatsappLink, '_blank')
}

