# 📄 Resume Maker

A modern, professional resume builder website built with React and Vite. Create beautiful resumes in minutes with multiple template options.

## ✨ Features

- **Multi-Step Form**: Easy-to-use form to fill in all your resume details
- **Multiple Templates**: Choose from 3 professional resume templates:
  - Modern Professional - Clean and modern design for tech professionals
  - Classic Elegant - Traditional format with elegant styling
  - Creative Bold - Eye-catching design for creative professionals
- **PDF Download**: Download your resume as a high-quality PDF
- **Dynamic Fields**: Add/remove multiple entries for experience, education, skills, and projects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Preview**: See your resume before downloading

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
resumemaker/
├── src/
│   ├── components/
│   │   ├── ResumeForm.jsx          # Main form component
│   │   ├── TemplateSelector.jsx     # Template selection component
│   │   ├── ResumePreview.jsx        # Preview and download component
│   │   └── templates/
│   │       ├── Template1.jsx        # Modern Professional template
│   │       ├── Template2.jsx        # Classic Elegant template
│   │       └── Template3.jsx        # Creative Bold template
│   ├── styles/
│   │   ├── App.css                  # Main app styles
│   │   └── templates.css            # Template-specific styles
│   ├── utils/
│   │   └── pdfGenerator.js          # PDF generation utility
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Usage

1. **Fill Your Details**: Enter your personal information, work experience, education, skills, and projects
2. **Select Template**: Choose from one of the three professional templates
3. **Preview**: Review your resume
4. **Download**: Click the download button to get your resume as a PDF

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **jsPDF** - PDF generation
- **html2canvas** - Convert HTML to canvas for PDF
- **CSS3** - Styling with modern features

## 📝 Form Sections

- Personal Information (Name, Email, Phone, Address, Social Links)
- Professional Summary
- Work Experience (Multiple entries)
- Education (Multiple entries)
- Skills (Dynamic list)
- Projects (Multiple entries)

## 🎯 Features in Detail

### Dynamic Form Fields
- Add multiple work experiences
- Add multiple education entries
- Add multiple skills dynamically
- Add multiple projects
- Remove any entry with a single click

### Template Options
- **Template 1**: Modern design with color accents, perfect for tech roles
- **Template 2**: Classic serif font, elegant and traditional
- **Template 3**: Bold header with gradient, creative layout

### PDF Generation
- High-quality PDF output
- Maintains template styling
- Proper page breaks for long resumes
- A4 format

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

- Fill in all sections for a complete resume
- Use the "Currently Working Here" checkbox for current positions
- Add relevant skills that match your experience
- Include project links to showcase your work
- Preview your resume before downloading to ensure everything looks good

---

Made with ❤️ - Create your perfect resume today!

