import { useState } from 'react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  return (
    <div className="site">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <span className="phone-icon">📞</span>
            <a href="tel:+50622995800">+506-2299-5800</a>
          </div>
          <div className="top-bar-right">
            <a href="#" className="lang-link active">EN</a>
            <span className="lang-sep">|</span>
            <a href="#" className="lang-link">ES</a>
          </div>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <img src="https://www.ict.go.cr/images/logo-ict-2018.png" alt="ICT Logo" />
          </div>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('ict')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href="#">ICT</a>
              {activeDropdown === 'ict' && (
                <div className="dropdown">
                  <a href="#">About Us</a>
                  <a href="#">Board of Directors</a>
                  <a href="#">Employee Directory</a>
                  <a href="#">Management Message</a>
                  <a href="#">Organization Chart</a>
                </div>
              )}
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('work')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href="#">Our Work</a>
              {activeDropdown === 'work' && (
                <div className="dropdown">
                  <a href="#">Administrative/Financial</a>
                  <a href="#">Tourism Consulting</a>
                  <a href="#">Development Planning</a>
                  <a href="#">Marketing</a>
                  <a href="#">Regional Offices</a>
                </div>
              )}
            </div>
            <div className="nav-item">
              <a href="#">Commissions</a>
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('services')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href="#">Services</a>
              {activeDropdown === 'services' && (
                <div className="dropdown">
                  <a href="#">Airplane Tickets</a>
                  <a href="#">Exoneration</a>
                  <a href="#">Campaigns</a>
                  <a href="#">Press Trips</a>
                  <a href="#">Guide Requirements</a>
                </div>
              )}
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('stats')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href="#">Statistics</a>
              {activeDropdown === 'stats' && (
                <div className="dropdown">
                  <a href="#">Economic Figures</a>
                  <a href="#">Reports</a>
                  <a href="#">Surveys</a>
                  <a href="#">Tourism Figures</a>
                </div>
              )}
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('sustain')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href="#">Sustainability</a>
              {activeDropdown === 'sustain' && (
                <div className="dropdown">
                  <a href="#">CST</a>
                  <a href="#">Code of Conduct</a>
                  <a href="#">Blue Flag Program</a>
                </div>
              )}
            </div>
            <div className="nav-item">
              <a href="#">Documents</a>
            </div>
            <div className="nav-item">
              <a href="#">Contact Us</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Costa Rica Tourism Board</h1>
          <p className="hero-sub">INSTITUTIONAL SITE</p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome">
        <div className="container">
          <h2>Welcome</h2>
          <p>
            The Costa Rican Tourism Board (ICT) invites you to explore this dynamic platform,
            in which you can learn in detail about the area of activity of Costa Rica's leading
            tourism institution, with up-to-date information for all of your inquiries.
          </p>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="quick-access">
        <div className="container">
          <div className="card-grid">
            <div className="icon-card">
              <div className="icon-circle">📊</div>
              <h3>Statistics</h3>
              <p>Tourism Statistics</p>
              <a href="#" className="card-link">Learn More →</a>
            </div>
            <div className="icon-card">
              <div className="icon-circle">🌿</div>
              <h3>Sustainability</h3>
              <p>Tourism Sustainability</p>
              <a href="#" className="card-link">Learn More →</a>
            </div>
            <div className="icon-card">
              <div className="icon-circle">📋</div>
              <h3>Procedures</h3>
              <p>and Citizen Information</p>
              <a href="#" className="card-link">Learn More →</a>
            </div>
            <div className="icon-card">
              <div className="icon-circle">📍</div>
              <h3>Regional Offices</h3>
              <p>Where can you find us?</p>
              <a href="#" className="card-link">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Services */}
      <section className="services-section">
        <div className="container">
          <h2>Institutional Services</h2>
          <div className="services-grid">
            {[
              { title: 'Airplane Tickets', desc: 'Travel coordination and airline ticket management for institutional purposes.' },
              { title: 'Cooperative Campaigns', desc: 'Joint promotional campaigns with tourism industry partners.' },
              { title: 'Country Brand', desc: 'Management and promotion of Costa Rica\'s Essential Costa Rica brand.' },
              { title: 'Press Trips', desc: 'Organized media visits to showcase Costa Rica\'s tourism offerings.' },
              { title: 'Tourist Guide Requirements', desc: 'Licensing and certification for professional tourist guides.' },
              { title: 'Tax Return', desc: 'Tax incentive programs for qualifying tourism businesses.' },
              { title: 'Tourism Development', desc: 'Strategic planning and development of tourism infrastructure.' },
              { title: 'Crafts with Identity', desc: 'Supporting authentic Costa Rican artisan craftsmanship.' },
              { title: 'Cultural Tourist Guide', desc: 'Specialized guidance for cultural heritage tourism experiences.' },
            ].map((service) => (
              <div className="service-card" key={service.title}>
                <div className="service-img"></div>
                <div className="service-body">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                  <a href="#" className="read-more">Read more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Statistics Banner */}
      <section className="stats-banner">
        <div className="container">
          <h2>Tourism Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">75%</div>
              <p>travel for vacation purposes</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">2M+</div>
              <p>visits per year</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">68%</div>
              <p>enjoy the sun and beaches</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <h2>Latest News</h2>
          <div className="news-grid">
            {[
              { title: 'Río Cuarto Canton Brand Launch', desc: 'New destination branding initiative highlights the natural beauty and cultural heritage of Río Cuarto.' },
              { title: 'Glamping in Geodesic Domes', desc: 'Innovative eco-tourism accommodation options expanding across Costa Rica\'s diverse landscapes.' },
              { title: 'Santa Cruz and Nicoya Attractions', desc: 'Discover the rich traditions and stunning coastlines of Guanacaste\'s most beloved destinations.' },
              { title: 'Manuel Antonio Reopening', desc: 'One of Costa Rica\'s most popular national parks welcomes visitors with enhanced sustainability measures.' },
            ].map((news) => (
              <div className="news-card" key={news.title}>
                <div className="news-img"></div>
                <div className="news-body">
                  <h4>{news.title}</h4>
                  <p>{news.desc}</p>
                  <a href="#" className="read-more">Read more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <h4>Costa Rica Tourism Board</h4>
            <p>Instituto Costarricense de Turismo</p>
            <div className="footer-logos">
              <span className="essential-cr">essential COSTA RICA</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>📞 +506 2299-5800</p>
            <p>✉️ info@ict.go.cr</p>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Other Sites</h4>
            <a href="#">Visit Costa Rica</a>
            <a href="#">CST Certification</a>
            <a href="#">Board of Directors</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© All Rights Reserved - 2025 | Costa Rica Tourism Board</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Site Map</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
