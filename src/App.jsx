import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const content = {
    home: {
      type: 'home',
      title: 'Specialist în Relația Om-Animal & Ecosisteme Emoționale.',
      subtitle: ' Ajut familiile și organizațiile să înțeleagă limbajul nevăzut al animalelor pentru a crea armonie, siguranță și atașament profund.Descifrăm instinctele pentru a construi conexiuni',
      text: 'Bine ai venit în spațiul unde știința comportamentului întâlnește empatia. Aici, traducerile nu se fac dintr-o limbă în alta, ci dintr-un instinct într-o emoție.'
    },
    despre: {
      type: 'despre',
      sections: [
        {
          title: 'Poveste',
          text: 'Sunt psiholog (în formare) pasionat de frontiera dintre speciile noastre. Cred că sănătatea noastră mentală este strâns legată de modul în care interacționăm cu natura și cu animalele de lângă noi.'
        },
        {
          title: 'Abordare',
          text: 'Misiunea mea este să transform termenul de \'stăpân\' în cel de \'părinte conștient\', folosind cercetarea academică și instrumentele digitale moderne pentru a facilita această evoluție.'
        }
      ]
    },
    servicii: {
      type: 'despre',
      sections: [
        {
          title: 'Proiectul AnimaPsych',
          text: 'Sunt psiholog (în formare) pasionat de frontiera dintre speciile noastre. Cred că sănătatea noastră mentală este strâns legată de modul în care interacționăm cu natura și cu animalele de lângă noi.'
        },
        {
          title: 'Proiecte de Consultanță',
          text: ' (Aici vei adăuga pe viitor studii de caz: „Reabilitarea anxietății de separare prin metoda atașamentului securizant”)'
        },
        {
          title: 'Publicații/Workshop-uri',
          text: 'Link-uri către articolele tale de pe blog sau prezentările de la facultate.'
        }
      ]
    },
    blog: {
      type: 'simple',
      title: 'Blog',
      text: 'Cititi articolele noastre despre comportamentul animal, psihologie comparata si sfaturi practice pentru a intelege mai bine animalele.'
    },
    contact: {
      type: 'simple',
      title: 'Contact',
      text: 'Pentru intrebari sau programari, ne puteti contacta la email@example.com sau telefon: +40 123 456 789.'
    }
  }

  const tabs = [
    { key: 'home', label: 'Acasă' },
    { key: 'despre', label: 'Despre mine' },
    { key: 'servicii', label: 'Portofoliu' },
    { key: 'blog', label: 'AI & Instrumente' },
    { key: 'contact', label: 'Contact' }
  ]

  const renderContent = () => {
    const data = content[activeTab]

    if (data.type === 'home') {
      return (
        <div className="content-hero">
          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
          <p>{data.text}</p>
        </div>
      )
    }

    if (data.type === 'despre') {
      return (
        <div className="content-two-section">
          {data.sections.map((section, idx) => (
            <section key={idx} className="content-section">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      )
    }

    if (data.type === 'simple') {
      return (
        <div className="content-simple">
          <h2>{data.title}</h2>
          <p>{data.text}</p>
        </div>
      )
    }
  }

  return (
    <>
      <header className="header">
        <h1>AnimaPsych</h1>
        <h2>Descifrăm instinctele pentru a construi conexiuni: Psihologie aplicată dincolo de cuvinte, de la om la animal.</h2>
        <img src={logo} alt="Logo" className="header-logo" />

        <nav className="button-row" aria-label="main actions">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* social buttons bottom-right of header */}
        <div className="social-row" aria-hidden="false" aria-label="social links">
          <a className="social-btn" href="https://www.facebook.com/profile.php?id=61585400849025" aria-label="Facebook" tabIndex="0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.1c0-2.2 1.3-3.4 3.3-3.4.95 0 1.9.17 1.9.17v2.1h-1.08c-1.07 0-1.4.66-1.4 1.34v1.6h2.4l-.38 2.9h-2v7A10 10 0 0022 12z"/></svg>
          </a>
          <a className="social-btn" href="https://www.instagram.com/anima_psych/" aria-label="Instagram" tabIndex="0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zm6.4-.8a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2zM12 10.2A1.8 1.8 0 1110.2 12 1.8 1.8 0 0112 10.2z"/></svg>
          </a>
          <a className="social-btn" href="https://www.linkedin.com/in/anima-psych-6a4b093a1/" aria-label="LinkedIn" tabIndex="0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11.02 0zM3 8.5h4v12H3zM9 8.5h3.7v1.6h.1c.5-.9 1.8-1.9 3.8-1.9 4.1 0 4.9 2.7 4.9 6.1V20.5h-4v-5.1c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.4-2 2.7V20.5H9z"/></svg>
          </a>
        </div>
      </header>

      <main className="content-box">
        {renderContent()}
      </main>
    </>
  )
}

export default App