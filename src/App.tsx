import { useState } from 'react'
import './App.css'

const BASE = 'https://www.ict.go.cr'

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
            <span>+506-2400-1234</span>
          </div>
          <div className="top-bar-right">
            <a href={`${BASE}/en/`} className="lang-link active">EN</a>
            <span className="lang-sep">|</span>
            <a href={`${BASE}/es/`} className="lang-link">ES</a>
          </div>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <a href={`${BASE}/en/`}>
              <img src="/images/logo-ict-2018.png" alt="ICT Logo" />
            </a>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('ict')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href={`${BASE}/en/ict/about-us.html`}>ICT</a>
              {activeDropdown === 'ict' && (
                <div className="dropdown">
                  <a href={`${BASE}/en/ict/about-us.html`}>About Us</a>
                  <a href={`${BASE}/en/ict/board-of-directors.html`}>Board of Directors</a>
                  <a href={`${BASE}/en/ict/employee-directory.html`}>Employee Directory</a>
                  <a href={`${BASE}/en/ict/message-from-the-managment.html`}>Management Message</a>
                  <a href={`${BASE}/en/ict/organization-chart.html`}>Organization Chart</a>
                </div>
              )}
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('work')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href={`${BASE}/en/our-work/administrative-and-financial-directorate.html`}>Our Work</a>
              {activeDropdown === 'work' && (
                <div className="dropdown">
                  <a href={`${BASE}/en/our-work/administrative-and-financial-directorate.html`}>Administrative/Financial</a>
                  <a href={`${BASE}/en/our-work/directorate-of-tourism-consulting-and-management.html`}>Tourism Consulting</a>
                  <a href={`${BASE}/en/our-work/directorate-of-tourism-development-and-planning.html`}>Development Planning</a>
                  <a href={`${BASE}/en/our-work/marketing-directorate.html`}>Marketing</a>
                  <a href={`${BASE}/en/our-work/regional-offices.html`}>Regional Offices</a>
                </div>
              )}
            </div>
            <div className="nav-item">
              <a href={`${BASE}/en/commissions/national-education-commission.html`}>Commissions</a>
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('services')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href={`${BASE}/en/institutional-services/airplane-tickets.html`}>Services</a>
              {activeDropdown === 'services' && (
                <div className="dropdown">
                  <a href={`${BASE}/en/institutional-services/airplane-tickets.html`}>Airplane Tickets</a>
                  <a href={`${BASE}/en/institutional-services/airplane-ticket-exoneration.html`}>Exoneration</a>
                  <a href={`${BASE}/en/institutional-services/cooperative-campaigns.html`}>Campaigns</a>
                  <a href={`${BASE}/en/institutional-services/press-trips.html`}>Press Trips</a>
                  <a href={`${BASE}/en/institutional-services/tourist-guide-requirements.html`}>Guide Requirements</a>
                </div>
              )}
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('stats')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href={`${BASE}/en/statistics/economic-figures.html`}>Statistics</a>
              {activeDropdown === 'stats' && (
                <div className="dropdown">
                  <a href={`${BASE}/en/statistics/economic-figures.html`}>Economic Figures</a>
                  <a href={`${BASE}/en/statistics/statistical-reports.html`}>Reports</a>
                  <a href={`${BASE}/en/statistics/surveys.html`}>Surveys</a>
                  <a href={`${BASE}/en/statistics/tourism-figures.html`}>Tourism Figures</a>
                </div>
              )}
            </div>
            <div className="nav-item" onMouseEnter={() => toggleDropdown('sustain')} onMouseLeave={() => setActiveDropdown(null)}>
              <a href={`${BASE}/en/sustainability/cst.html`}>Sustainability</a>
              {activeDropdown === 'sustain' && (
                <div className="dropdown">
                  <a href={`${BASE}/en/sustainability/cst.html`}>CST</a>
                  <a href={`${BASE}/en/sustainability/code-of-conduct.html`}>Code of Conduct</a>
                  <a href={`${BASE}/en/sustainability/ecologic-blue-flag-program.html`}>Blue Flag Program</a>
                </div>
              )}
            </div>
            <div className="nav-item">
              <a href={`${BASE}/en/documents/institutional-plans-and-documents.html`}>Documents</a>
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
            <a href={`${BASE}/en/statistics.html`} className="icon-card">
              <img className="icon-img" src="/images/iconos/icon-estadisticas.png" alt="Statistics" />
              <h3>Statistics</h3>
              <p>Tourism Statistics</p>
              <span className="card-link">Learn More →</span>
            </a>
            <a href={`${BASE}/en/component/content/article/811-sustainability.html?Itemid=563&catid=118`} className="icon-card">
              <img className="icon-img" src="/images/iconos/icon-sostenibilidad.png" alt="Sustainability" />
              <h3>Sustainability</h3>
              <p>Tourism Sustainability</p>
              <span className="card-link">Learn More →</span>
            </a>
            <a href={`${BASE}/en/formalities/procedures-and-information-to-citizens.html`} className="icon-card">
              <img className="icon-img" src="/images/iconos/icon-tramites.png" alt="Procedures" />
              <h3>Procedures</h3>
              <p>and Citizen Information</p>
              <span className="card-link">Learn More →</span>
            </a>
            <a href={`${BASE}/en/our-work/regional-offices.html`} className="icon-card">
              <img className="icon-img" src="/images/iconos/icon-promocional.png" alt="Regional Offices" />
              <h3>Regional Offices</h3>
              <p>Where can you find us?</p>
              <span className="card-link">Learn More →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Institutional Services */}
      <section className="services-section">
        <div className="container">
          <h2>Institutional Services</h2>
          <div className="services-grid">
            {[
              { title: 'Airplane Tickets', desc: 'Travel coordination and airline ticket management for institutional purposes.', img: '/images/media/boletos.jpg', link: '/en/institutional-services/airplane-tickets.html' },
              { title: 'Cooperative Campaigns', desc: 'Joint promotional campaigns with tourism industry partners.', img: '/images/media/campanas-cooperativas.png', link: '/en/institutional-services/cooperative-campaigns.html' },
              { title: 'Country Brand', desc: "Management and promotion of Costa Rica's Essential Costa Rica brand.", img: '/images/media/marcas.jpg', link: '/en/institutional-services/country-brand.html' },
              { title: 'Press Trips', desc: "Organized media visits to showcase Costa Rica's tourism offerings.", img: '/images/media/viajes-prensa.png', link: '/en/institutional-services/press-trips.html' },
              { title: 'Tourist Guide Requirements', desc: 'Licensing and certification for professional tourist guides.', img: '/images/media/guia-turismo.jpg', link: '/en/institutional-services/tourist-guide-requirements.html' },
              { title: 'Tax Return', desc: 'Tax incentive programs for qualifying tourism businesses.', img: '/images/media/impuestos.jpg', link: '/en/institutional-services/tax-return.html' },
              { title: 'Tourism Development', desc: 'Strategic planning and development of tourism infrastructure.', img: '/images/media/gestion.png', link: '/en/our-work/tourism-development.html' },
              { title: 'Crafts with Identity', desc: 'Supporting authentic Costa Rican artisan craftsmanship.', img: '/images/media/artesanias.jpg', link: '/en/institutional-services/crafts-with-identity.html' },
              { title: 'Cultural Tourist Guide', desc: 'Specialized guidance for cultural heritage tourism experiences.', img: '/images/media/guias-culturales.jpg', link: '/en/institutional-services/cultural-tourist-guide.html' },
            ].map((service) => (
              <a href={`${BASE}${service.link}`} className="service-card" key={service.title}>
                <div className="service-img" style={{ backgroundImage: `url(${service.img})` }}></div>
                <div className="service-body">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                  <span className="read-more">Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Statistics Banner */}
      <section className="stats-banner">
        <div className="container">
          <h2>Tourism Statistics</h2>
          <div className="stats-grid">
            <a href={`${BASE}/en/statistics/tourism-figures.html`} className="stat-card">
              <img src="/images/internas/est-1-en.png" alt="75% travel for vacation" className="stat-img" />
            </a>
            <a href={`${BASE}/en/statistics/economic-figures.html`} className="stat-card">
              <img src="/images/internas/est-2.png" alt="More than 2 million visits" className="stat-img" />
            </a>
            <a href={`${BASE}/en/statistics/tourism-figures/charts-and-graphics.html`} className="stat-card">
              <img src="/images/internas/est-3.png" alt="68% enjoy sun and beaches" className="stat-img" />
            </a>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <h2>Latest News</h2>
          <div className="news-grid">
            {[
              { title: 'Río Cuarto Canton Brand Launch', desc: 'New destination branding initiative highlights the natural beauty and cultural heritage of Río Cuarto.', img: '/images/nota_rio_cuarto.jpg', link: "/en/top-news/1936-r\u00edo-cuarto-launches-canton-brand,-seeking-to-become-the-country's-newest-tourism-destination.html" },
              { title: 'Manuel Antonio Reopening', desc: "One of Costa Rica's most popular national parks welcomes visitors with enhanced sustainability measures.", img: '/images/nota_MA.jpg', link: '/en/top-news/1870-manuel-antonio-to-open-mondays-beginning-april-1.html' },
              { title: 'FITUR Award', desc: 'Costa Rica recognized at international tourism fair for excellence in sustainable tourism practices.', img: '/images/premio_fitur.jpg', link: '/en/featured-news/1935-costa-rica-wins-best-sustainable-stand-at-the-fitur-tourism-fair-in-spain.html' },
              { title: 'National Campaign', desc: 'New national tourism campaign promotes domestic travel and highlights hidden gems across the country.', img: '/images/nota_camp_nac.jpg', link: '/en/top-news/1899-nine-can\'t-miss-attractions-you-have-to-see-in-santa-cruz-and-nicoya.html' },
            ].map((news) => (
              <a href={`${BASE}${news.link}`} className="news-card" key={news.title}>
                <div className="news-img" style={{ backgroundImage: `url(${news.img})` }}></div>
                <div className="news-body">
                  <h4>{news.title}</h4>
                  <p>{news.desc}</p>
                  <span className="read-more">Read more →</span>
                </div>
              </a>
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
              <a href="http://www.esencialcostarica.com/">
                <img src="/images/esencial.svg" alt="Essential Costa Rica" className="essential-logo" />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>📞 +506-2400-1234</p>
            <p>✉️ turismo@costarica.travel</p>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/InstitutoCostarricensedeTurismoOficial/" target="_blank" rel="noopener noreferrer"><img src="/images/internas/social/facebook.png" alt="Facebook" className="social-icon" /> Facebook</a>
              <a href="https://www.instagram.com/oficial_ict/" target="_blank" rel="noopener noreferrer"><img src="/images/internas/social/Instagram.png" alt="Instagram" className="social-icon" /> Instagram</a>
              <a href="https://www.youtube.com/channel/UCf4vVKxVaYpRtmFaStDfQTw" target="_blank" rel="noopener noreferrer"><img src="/images/internas/social/youtube.png" alt="YouTube" className="social-icon" /> YouTube</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Other Sites</h4>
            <a href="https://www.visitcostarica.com/es" target="_blank" rel="noopener noreferrer">Visit Costa Rica</a>
            <a href="https://cst.turismo-sostenible.co.cr/" target="_blank" rel="noopener noreferrer">CST Certification</a>
            <a href="https://ictcomisiones.com/junta/" target="_blank" rel="noopener noreferrer">Board of Directors</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-logos">
            <a href="http://www.ict.go.cr/"><img src="/images/footer-logos/ict-footer.png" alt="ICT" className="footer-logo-img" /></a>
            <a href="http://gob.go.cr/"><img src="/images/footer-logos/digital.png" alt="Digital Government" className="footer-logo-img" /></a>
            <a href="https://www.sicop.go.cr/index.jsp"><img src="/images/footer-logos/logosicop.gif" alt="SICOP" className="footer-logo-img" /></a>
            <a href="https://www.turismo-sostenible.co.cr/es/firma-compromiso/compromiso-codigo-de-conducta"><img src="/images/footer-logos/contra.png" alt="Code of Conduct" className="footer-logo-img" /></a>
          </div>
          <p>© All Rights Reserved - 2025 | Costa Rica Tourism Board</p>
          <div className="footer-bottom-links">
            <a href={`${BASE}/en/?view=article&id=105:pol%C3%ADtica-de-privacidad&catid=2`}>Privacy Policy</a>
            <a href={`${BASE}/en/component/osmap/?view=html&id=1`}>Site Map</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
