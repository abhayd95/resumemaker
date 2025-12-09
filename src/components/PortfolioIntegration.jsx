import { useState } from 'react'

const PortfolioIntegration = ({ resumeData, onUpdate, onClose }) => {
  const [portfolioItems, setPortfolioItems] = useState(resumeData.portfolio || [])
  const [activeTab, setActiveTab] = useState('add') // 'add', 'github', 'images', 'videos'

  const [newItem, setNewItem] = useState({
    type: 'link', // 'link', 'image', 'video', 'github'
    title: '',
    description: '',
    url: '',
    image: null,
    technologies: []
  })

  const handleAddItem = () => {
    if (!newItem.title || !newItem.url) {
      alert('Please fill in title and URL')
      return
    }

    const item = {
      ...newItem,
      id: Date.now(),
      date: new Date().toISOString()
    }

    setPortfolioItems([...portfolioItems, item])
    setNewItem({
      type: 'link',
      title: '',
      description: '',
      url: '',
      image: null,
      technologies: []
    })
  }

  const handleRemoveItem = (id) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({ ...resumeData, portfolio: portfolioItems })
    }
    alert('Portfolio items saved!')
    onClose()
  }

  const connectGitHub = () => {
    const githubUrl = prompt('Enter your GitHub profile URL:', resumeData.personalInfo?.github || '')
    if (githubUrl) {
      // In production, this would fetch GitHub repos via API
      alert('GitHub integration would fetch your repositories here')
    }
  }

  return (
    <div className="portfolio-modal">
      <div className="portfolio-content">
        <div className="portfolio-header">
          <h2>🎨 Portfolio Integration</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="portfolio-tabs">
          <button
            onClick={() => setActiveTab('add')}
            className={`portfolio-tab ${activeTab === 'add' ? 'active' : ''}`}
          >
            ➕ Add Item
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`portfolio-tab ${activeTab === 'github' ? 'active' : ''}`}
          >
            💻 GitHub
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`portfolio-tab ${activeTab === 'images' ? 'active' : ''}`}
          >
            🖼️ Images
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`portfolio-tab ${activeTab === 'videos' ? 'active' : ''}`}
          >
            🎥 Videos
          </button>
        </div>

        {activeTab === 'add' && (
          <div className="portfolio-form">
            <div className="form-group">
              <label>Item Type:</label>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                className="portfolio-type-select"
              >
                <option value="link">Link</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="github">GitHub Repository</option>
              </select>
            </div>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Project/Portfolio Item Title"
                className="portfolio-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Describe your project..."
                rows="3"
                className="portfolio-textarea"
              />
            </div>

            <div className="form-group">
              <label>URL *</label>
              <input
                type="url"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                placeholder="https://..."
                className="portfolio-input"
              />
            </div>

            {newItem.type === 'image' && (
              <div className="form-group">
                <label>Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="portfolio-file-input"
                />
                {newItem.image && (
                  <img src={newItem.image} alt="Preview" className="image-preview" />
                )}
              </div>
            )}

            <button onClick={handleAddItem} className="btn-add-portfolio">
              ➕ Add to Portfolio
            </button>
          </div>
        )}

        {activeTab === 'github' && (
          <div className="github-integration">
            <div className="github-info">
              <h3>GitHub Integration</h3>
              <p>Connect your GitHub account to automatically import your repositories</p>
              <button onClick={connectGitHub} className="btn-connect-github">
                🔗 Connect GitHub
              </button>
              {resumeData.personalInfo?.github && (
                <div className="github-status">
                  <p>Connected: {resumeData.personalInfo.github}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="images-gallery">
            <h3>Image Gallery</h3>
            <div className="gallery-grid">
              {portfolioItems.filter(item => item.type === 'image').map(item => (
                <div key={item.id} className="gallery-item">
                  {item.image && <img src={item.image} alt={item.title} />}
                  <div className="gallery-item-info">
                    <h4>{item.title}</h4>
                    <button onClick={() => handleRemoveItem(item.id)} className="btn-remove">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="videos-section">
            <h3>Video Portfolio</h3>
            <div className="videos-list">
              {portfolioItems.filter(item => item.type === 'video').map(item => (
                <div key={item.id} className="video-item">
                  <div className="video-info">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Watch Video →
                    </a>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="btn-remove">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="portfolio-items-list">
          <h3>Portfolio Items ({portfolioItems.length})</h3>
          <div className="items-grid">
            {portfolioItems.map(item => (
              <div key={item.id} className="portfolio-item-card">
                <div className="item-header">
                  <span className="item-type-badge">{item.type}</span>
                  <button onClick={() => handleRemoveItem(item.id)} className="btn-remove-small">
                    ✕
                  </button>
                </div>
                <h4>{item.title}</h4>
                {item.description && <p>{item.description}</p>}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-link">
                    View →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-save-portfolio">
            💾 Save Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}

export default PortfolioIntegration

