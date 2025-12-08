// Word Document Export Utility
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'

export const exportToWord = async (formData, fileName = 'resume') => {
  try {
    const children = []

    // Header with Name
    if (formData.personalInfo?.fullName) {
      children.push(
        new Paragraph({
          text: formData.personalInfo.fullName,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        })
      )
    }

    // Contact Information
    const contactInfo = []
    if (formData.personalInfo?.email) contactInfo.push(formData.personalInfo.email)
    if (formData.personalInfo?.phone) contactInfo.push(formData.personalInfo.phone)
    if (formData.personalInfo?.address) contactInfo.push(formData.personalInfo.address)
    
    if (contactInfo.length > 0) {
      children.push(
        new Paragraph({
          text: contactInfo.join(' | '),
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        })
      )
    }

    // Professional Summary
    if (formData.summary) {
      children.push(
        new Paragraph({
          text: 'Professional Summary',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        }),
        new Paragraph({
          text: formData.summary,
          spacing: { after: 300 }
        })
      )
    }

    // Work Experience
    if (formData.experience && formData.experience.length > 0) {
      children.push(
        new Paragraph({
          text: 'Work Experience',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        })
      )

      formData.experience.forEach(exp => {
        const dateRange = exp.current 
          ? `${exp.startDate} - Present`
          : `${exp.startDate} - ${exp.endDate}`
        
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${exp.position} at ${exp.company}`,
                bold: true
              }),
              new TextRun({
                text: ` (${dateRange})`,
                italics: true
              })
            ],
            spacing: { after: 100 }
          })
        )

        if (exp.description) {
          children.push(
            new Paragraph({
              text: exp.description,
              spacing: { after: 200 }
            })
          )
        }
      })
    }

    // Education
    if (formData.education && formData.education.length > 0) {
      children.push(
        new Paragraph({
          text: 'Education',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        })
      )

      formData.education.forEach(edu => {
        const dateRange = `${edu.startDate} - ${edu.endDate}`
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.degree} in ${edu.field}`,
                bold: true
              }),
              new TextRun({
                text: ` - ${edu.institution} (${dateRange})`
              })
            ],
            spacing: { after: 100 }
          })
        )

        if (edu.gpa) {
          children.push(
            new Paragraph({
              text: `GPA: ${edu.gpa}`,
              spacing: { after: 200 }
            })
          )
        }
      })
    }

    // Skills
    if (formData.skills && formData.skills.length > 0) {
      children.push(
        new Paragraph({
          text: 'Skills',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        }),
        new Paragraph({
          text: formData.skills.join(', '),
          spacing: { after: 300 }
        })
      )
    }

    // Projects
    if (formData.projects && formData.projects.length > 0) {
      children.push(
        new Paragraph({
          text: 'Projects',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        })
      )

      formData.projects.forEach(project => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: project.name,
                bold: true
              })
            ],
            spacing: { after: 100 }
          })
        )

        if (project.description) {
          children.push(
            new Paragraph({
              text: project.description,
              spacing: { after: 100 }
            })
          )
        }

        if (project.technologies) {
          children.push(
            new Paragraph({
              text: `Technologies: ${project.technologies}`,
              italics: true,
              spacing: { after: 200 }
            })
          )
        }
      })
    }

    // Languages
    if (formData.languages && formData.languages.length > 0) {
      children.push(
        new Paragraph({
          text: 'Languages',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        })
      )

      formData.languages.forEach(lang => {
        children.push(
          new Paragraph({
            text: `${lang.name} - ${lang.proficiency}`,
            spacing: { after: 100 }
          })
        )
      })
    }

    // Certifications
    if (formData.certifications && formData.certifications.length > 0) {
      children.push(
        new Paragraph({
          text: 'Certifications',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        })
      )

      formData.certifications.forEach(cert => {
        children.push(
          new Paragraph({
            text: `${cert.name} - ${cert.organization}${cert.date ? ` (${cert.date})` : ''}`,
            spacing: { after: 100 }
          })
        )
      })
    }

    // Create document
    const doc = new Document({
      sections: [{
        properties: {},
        children: children
      }]
    })

    // Generate and download
    const blob = await Packer.toBlob(doc)
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileName}.docx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error('Error exporting to Word:', error)
    throw error
  }
}

