import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

const BASE = 'https://www.ict.go.cr'

const QUESTIONS = [
  'Water',
  'The baby is in the water',
  'I need a towel, please',
  'Do not splash grandma in the pool',
  'Run, baby, run before the crocodile eats you',
]

const SECONDS_PER_QUESTION = 8

function Assessment() {
  const [phase, setPhase] = useState<'setup' | 'active' | 'complete'>('setup')
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [qProgress, setQProgress] = useState(100)
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null)
  const [reviewUrl, setReviewUrl] = useState<string | null>(null)

  const streamRef = useRef<MediaStream | null>(null)

  // Callback ref: whenever a <video> mounts, attach the stream
  const videoRef = useCallback((node: HTMLVideoElement | null) => {
    if (node && streamRef.current) {
      node.srcObject = streamRef.current
    }
  }, [])
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)
  const qTimerRef = useRef<number | null>(null)
  const currentQRef = useRef(0)

  const endTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (qTimerRef.current) clearInterval(qTimerRef.current)
    recorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
  }, [])

  const showQuestion = useCallback(() => {
    if (currentQRef.current >= QUESTIONS.length) {
      endTest()
      return
    }
    setCurrentQ(currentQRef.current)
    setQProgress(100)

    let elapsed = 0
    const tick = 100
    if (qTimerRef.current) clearInterval(qTimerRef.current)
    qTimerRef.current = window.setInterval(() => {
      elapsed += tick
      const pct = Math.max(0, 100 - (elapsed / (SECONDS_PER_QUESTION * 1000)) * 100)
      setQProgress(pct)
      if (elapsed >= SECONDS_PER_QUESTION * 1000) {
        if (qTimerRef.current) clearInterval(qTimerRef.current)
        currentQRef.current++
        showQuestion()
      }
    }, tick)
  }, [endTest])

  // Request camera on mount, then immediately start recording + questions
  useEffect(() => {
    let mounted = true
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if (!mounted) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream
        setCameraReady(true)

        // Pick a supported mimeType (iOS Safari doesn't support webm)
        const mimeType = MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : MediaRecorder.isTypeSupported('video/mp4')
            ? 'video/mp4'
            : ''
        const recorder = mimeType
          ? new MediaRecorder(stream, { mimeType })
          : new MediaRecorder(stream)
        const actualMime = recorder.mimeType || 'video/webm'
        const ext = actualMime.includes('mp4') ? 'mp4' : 'webm'
        recorderRef.current = recorder
        recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: actualMime })
          const url = URL.createObjectURL(blob)
          setRecordingBlob(blob)
          setReviewUrl(url)
          setPhase('complete')

          // Auto-download
          const a = document.createElement('a')
          a.href = url
          a.download = `poolside-assessment-${Date.now()}.${ext}`
          a.click()
        }
        recorder.start()

        timerRef.current = window.setInterval(() => {
          setTotalSeconds(s => s + 1)
        }, 1000)

        setPhase('active')
        showQuestion()
      } catch {
        setCameraError(true)
      }
    }
    init()
    return () => {
      mounted = false
      if (timerRef.current) clearInterval(timerRef.current)
      if (qTimerRef.current) clearInterval(qTimerRef.current)
    }
  }, [showQuestion])

  const formatTime = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0')
    const sec = String(s % 60).padStart(2, '0')
    return `${m}:${sec}`
  }

  const handleDownload = () => {
    if (!recordingBlob) return
    const ext = recordingBlob.type.includes('mp4') ? 'mp4' : 'webm'
    const a = document.createElement('a')
    a.href = URL.createObjectURL(recordingBlob)
    a.download = `poolside-assessment-${Date.now()}.${ext}`
    a.click()
  }

  if (phase === 'setup') {
    return (
      <div className="test-setup">
        <h2>Preparing Your Assessment</h2>
        <p className="setup-sub">Poolside Spanish Assessment · Verbal Response Recording</p>
        {cameraError ? (
          <div className="camera-notice" style={{ textAlign: 'left', maxWidth: 460, margin: '0 auto' }}>
            <strong>Camera access was denied.</strong> This assessment requires camera and microphone access to record your verbal responses. Please enable permissions in your browser settings and reload the page.
          </div>
        ) : (
          <p className="setup-instructions">Requesting camera and microphone access...</p>
        )}
        <p className="notice-decreto" style={{ marginTop: 24 }}>
          Your recording is used for verification purposes only.
        </p>
      </div>
    )
  }

  if (phase === 'complete') {
    return (
      <div className="test-complete">
        <div className="complete-check">✓</div>
        <h2>Assessment Complete</h2>
        <p className="complete-sub">Poolside Spanish Assessment — Passed</p>
        <div className="complete-details">
          <p>Your recording has been saved and linked to your travel documentation.</p>
          <p>No further action is required.</p>
        </div>
        <div className="confirmation-box">
          <div className="confirmation-label">Confirmation Number</div>
          <div className="confirmation-number">PSA-2026-{Math.floor(Math.random() * 900000 + 100000)}</div>
        </div>
        <button className="cta-button" onClick={handleDownload} style={{ marginTop: 24 }}>
          Save Recording for Records
        </button>
        {reviewUrl && (
          <video src={reviewUrl} controls className="review-video" />
        )}
        <p className="notice-decreto" style={{ marginTop: 24 }}>
          Instituto Costarricense de Turismo · Decreto Ejecutivo No. 44891-TUR
        </p>
      </div>
    )
  }

  return (
    <div className="test-active">
      <div className="test-top-bar">
        <div className="rec-badge"><div className="rec-dot" /> REC</div>
        <div className="test-progress-text">Question {currentQ + 1} of {QUESTIONS.length}</div>
        <div className="test-timer">{formatTime(totalSeconds)}</div>
      </div>
      <div className="test-body">
        <div className="webcam-container">
          <video ref={videoRef} autoPlay muted playsInline className="webcam-video" />
        </div>
        <div className="test-question-area">
          <div className="test-question-label">Say in Spanish</div>
          <div className="test-question-text">"{QUESTIONS[currentQ]}"</div>
          <div className="question-timer-bar">
            <div className="question-timer-fill" style={{ width: `${qProgress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [assessmentStarted, setAssessmentStarted] = useState(false)

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  const startAssessment = () => {
    setAssessmentStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

      {!assessmentStarted ? (
        <>
          {/* Hero Banner */}
          <section className="hero">
            <div className="hero-overlay">
              <div className="alert-badge">ACTION REQUIRED</div>
              <h1>Take the Poolside Spanish Assessment Now</h1>
              <p className="hero-sub">REQUIRED FOR TRAVELERS STAYING AT PROPERTIES WITH POOL ACCESS</p>
            </div>
          </section>

          {/* Quick Info */}
          <section className="quick-access">
            <div className="container">
              <div className="card-grid card-grid-3">
                <div className="icon-card">
                  <div className="check-icon">✓</div>
                  <h3>Easy to complete</h3>
                  <p>Only basic Spanish is needed.</p>
                </div>
                <div className="icon-card">
                  <div className="check-icon">⏱</div>
                  <h3>5 to 10 minutes</h3>
                  <p>Most visitors finish quickly.</p>
                </div>
                <div className="icon-card">
                  <div className="check-icon">📅</div>
                  <h3>30-day window</h3>
                  <p>Must be completed within 30 days of travel.</p>
                </div>
              </div>
              <div className="cta-section">
                <button className="cta-button" onClick={startAssessment}>
                  Begin Assessment
                </button>
              </div>
            </div>
          </section>

          {/* Visitor Travel Notice */}
          <section className="notice-section">
            <div className="container">
              <div className="notice-card">
                <div className="notice-header">
                  <span className="notice-flag">🇨🇷</span>
                  <div>
                    <h2>REPUBLIC OF COSTA RICA</h2>
                    <h3>Visitor Travel Notice</h3>
                  </div>
                </div>

                <p className="notice-intro">
                  Visitors staying at any hotel, villa, rental home, resort, or private residence with pool access must complete a brief <strong>Poolside Spanish Assessment</strong> before travel.
                </p>

                <p>
                  This assessment is intended to confirm basic poolside Spanish familiarity for common visitor situations.
                </p>

                <div className="notice-item">
                  <h4>Who must complete it</h4>
                  <p>Any non-resident visitor staying at a property with pool access.</p>
                </div>

                <div className="notice-item">
                  <h4>Additional rollout requirement</h4>
                  <p>For travel parties with a child under 2, at least one supervising adult must complete the assessment before arrival.</p>
                </div>

                <div className="notice-item">
                  <h4>Assessment standard</h4>
                  <p>The assessment is brief and designed for travelers with only limited Spanish familiarity. Advanced Spanish is not required.</p>
                </div>

                <div className="notice-item">
                  <h4>Completion window</h4>
                  <p>The assessment must be completed within 30 days of travel and before arrival.</p>
                </div>

                <div className="notice-item notice-highlight">
                  <h4>Visitor instruction</h4>
                  <p>Complete the Poolside Spanish Assessment now.</p>
                </div>

                <div className="camera-notice">
                  <strong>Camera and microphone required.</strong> This assessment records your verbal responses for identity verification. Please ensure your device camera and microphone are enabled before proceeding.
                </div>

                <div className="cta-section">
                  <button className="cta-button" onClick={startAssessment}>Begin Assessment</button>
                </div>

                <p className="notice-decreto">
                  Required under Decreto Ejecutivo No. 44891-TUR for all non-resident visitors with poolside access.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="assessment-section">
          <div className="container">
            <Assessment />
          </div>
        </section>
      )}

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
