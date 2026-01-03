import { useState } from 'react'
import logo from './assets/logo.png'
import CV from './assets/CV.pdf'
import ReclamaAudio from './assets/reclama_audio.m4a'
import TutorialVideo from './assets/tutorial.mp4'
import Reclamavideo from './assets/Reclama.mp4'
import CVVideo from './assets/CV.mp4'
import BusinessCardFront from './assets/1.png'
import BusinessCardBack from './assets/2.png'
import ReclamaPrint from './assets/reclama.png'
import './App.css'


// Parse inline markdown: **bold**, [text](url), and plain URLs
const parseInline = (text) => {
  if (!text) return null;

  const nodes = [];
  const inlineRegex = /(\*\*([^*]+)\*\*)|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s]+)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = inlineRegex.exec(text)) !== null) {
    // push preceding plain text
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // bold matched (group 2)
      nodes.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      // markdown link matched (group 3=text, group 4=url)
      const href = match[4];
      const label = match[3];
      nodes.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    } else if (match[5]) {
      // plain URL matched (group 5)
      const href = match[5];
      nodes.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
          {href}
        </a>
      );
    }

    lastIndex = inlineRegex.lastIndex;
  }

  // trailing text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

// Updated parseFormattedText uses parseInline for paragraphs and list items
const parseFormattedText = (text) => {
  if (!text) return null;

  const elements = [];
  const lines = text.split('\n');
  let bulletListItems = [];
  let paraIndex = 0;
  let listIndex = 0;

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('•')) {
      bulletListItems.push(
        <li key={`bullet-${listIndex++}`}>{parseInline(trimmed.substring(1).trim())}</li>
      );
    } else {
      if (bulletListItems.length > 0) {
        elements.push(
          <ul key={`list-${idx}`} style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            {bulletListItems}
          </ul>
        );
        bulletListItems = [];
      }

      if (trimmed) {
        elements.push(
          <p key={`para-${paraIndex++}`} style={{ marginTop: idx > 0 ? '0.5rem' : '0' }}>
            {parseInline(trimmed)}
          </p>
        );
      }
    }
  });

  if (bulletListItems.length > 0) {
    elements.push(
      <ul key="final-list" style={{ marginTop: '0.5rem' }}>
        {bulletListItems}
      </ul>
    );
  }

  return elements;
};

const getVideoEmbedUrl = (url) => {
  if (!url) return null;
  // YouTube short link
  const ytShort = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  // YouTube watch link
  const ytWatch = url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // Vimeo (simple)
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
};

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const openLightbox = (src) => setLightboxSrc(src)
  const closeLightbox = () => setLightboxSrc(null)

  const content = {
    home: {
      type: 'home',
      title: 'Specialist în Relația Om-Animal & Ecosisteme Emoționale.',
      paragraphs: [
        {
          text: 'Bine ai venit în spațiul unde știința psihologiei comportamentale întâlnește empatia. Aici, traducerile nu se fac dintr-o limbă în alta, ci dintr-un instinct într-o emoție.'
        },
        {
          text: 'AnimaPsych a început ca un proiect academic în care am testat capacitatea AI de a comunica prin imagini concepte complexe de psihologie comparată.'
        },
        {
          text: 'Astăzi, este baza metodologiei mele de lucru: îmbin psihologia comportamentală și tehnologia modernă pentru a îmbunătăți calitatea vieții în familiile care împart casa cu un animal de companie. Cred că viitorul psihologiei este multispecie.'
        }
      ]
    },
    despre: {
      type: 'multi-section',
      text: 'Sunt psiholog (în formare) pasionat de frontiera dintre speciile noastre. Cred că sănătatea noastră mentală este strâns legată de modul în care interacționăm cu natura și cu animalele de lângă noi.\n**Abordarea acestui proiect** este de a transforma termenul de \'stăpân\' în cel de \'părinte conștient\', folosind cercetarea academică și instrumentele digitale moderne pentru a facilita această evoluție.\n**🧭 Definirea Conceptului AnimaPsych:**',
      sections: [
        {
          title: 'Etimologie și Semnificație (Etymology and Meaning)',
          text: '• **Anima:** Provine din latină și înseamnă „suflet”, „suflare” sau „viață”. În psihologie (Jung), reprezintă latura interioară, profundă.\n• **Psych (Psychology):** Studiul minții și al comportamentului. \n• **Conceptul central:** Explorarea „lumii interioare” a animalelor pentru a înțelege ce se află în spatele comportamentelor lor exterioare.'
        },
        {
          title: 'Misiunea (The Mission)',
          text: 'Misiunea **AnimaPsych** este de a traduce limbajul instinctual și emoțional al animalelor (în special al celor de companie) pe înțelesul oamenilor. Ne propunem să transformăm „stăpânii de animale” în „parteneri empatici” prin educație bazată pe psihologie și etologie.'
        },
        {
          title: 'Viziunea (The Vision)',
          text: 'O lume în care relația om-animal este bazată pe înțelegere profundă, nu doar pe dresaj. Vrem să demonstrăm că în spatele fiecărei canapele roase sau a fiecărui tors se află un mecanismpsihic fascinant.'
        },
        {
          title: 'Unghiul Unic (The "Freudian" Twist)',
          text: 'Spre deosebire de paginile clasice de „pet training”, **AnimaPsych** aduce o notă intelectuală și analitică:\n• Privim animalul nu ca pe o jucărie, ci ca pe un **subiect cu o viață psihică complexă**.\n• Folosim arhetipuri și concepte psihologice (instinct, atașament, traume, ierarhii) pentru aexplica viața de zi cu zi cu un animal de companie.'
        }
      ]
    },
    servicii: {
      type: 'multi-section',
      sections: [
        {
          title: 'Consultanță de Nișă: „Family System Balancing”',
          text: '• Noi nu tratăm doar animalul de companie, noi tratăm **dinamica**.\n• Oferim sesiuni de terapie/consultanță familiilor care trec prin schimbări majore: apariția unui nou-născut, mutarea în casă nouă sau gestionarea anxietății de separare a animalului după ce stăpânii revin la birou.'
        },
        {
          title: 'Creativ Digital & AI Educator (The Digital Lab)',
          text: '• Oferim ghiduri interactive, folosind AI-ul pentru a vizualiza emoțiile animalelor.\n• Dezvoltăm aplicații care „traduc” limbajul corporal al câinelui tău prin scanare foto, oferind explicații psihologice instantanee.'
        },
        {
          title: 'Design de Spațiu „Neuro-Animal Friendly”',
          text: '• Colaborarăm cu arhitecți pentru a crea locuințe care satisfac nevoile psihologice ale ambelor specii.\n• Recomandăm soluții de design interior care reduc stresul (delimitarea zonelor pentru „Safe Place”, controlul stimulilor vizuali și olfactive).'
        },
        {
          title: 'Expertiză în Terapie Asistată de Animale (TAA)',
          text: '• Dezvoltăm programe moderne de terapie pentru oameni (copii cu nevoi speciale, bătrâni sau angajați stresați) folosind animale.\n• Nu doar aducem un câine în cameră, ci elaborăm protocolul bazat pe Oxitocină și Biofilie.'
        }
      ]
    },
    portofoliu: {
      type: 'multi-section',
      title: 'Portofoliu',
      sections: [
        {
          title: 'AnimaPsych',
          text: 'Micro-campanie de 30 de zile de psihologie animală digitală desfăsurată pe social media: Un experiment care a demonstrat cum educația vizuală si conceptele academice pot ajunge la un public numeros.\n**Instagram:** https://www.instagram.com/anima_psych/\n**Facebook:** https://www.facebook.com/profile.php?id=61585400849025'
        },
        {
          title: 'Logo Design pentru AnimaPsych',
          text: 'Am creat un logo care îmbină elemente psihologice și animale, simbolizând conexiunea profundă dintre om și animal.',
          images: [
            { 
              src: logo, alt: 'AnimaPsych Logo' 
            }
          ]          
        },
        {
          title: 'Carte de vizită pentru AnimaPsych',
          text: 'Am proiectat o carte de vizită profesională care reflectă valorile și estetica AnimaPsych.',
          images: [
            { 
              src: BusinessCardFront, alt: 'Front of AnimaPsych Business Card' 
            },
            { 
              src: BusinessCardBack, alt: 'Back of AnimaPsych Business Card' 
            }
          ]          
        },
        {
          title: 'CV clasic (PDF)',
          text: 'Am realizat un CV profesional în format PDF.',
          pdf: CV
        },
        {
          title: 'CV clasic (Video)',
          text: 'Am realizat un CV profesional în format Video.',
          video: CVVideo
        },
        {
          title: 'Reclama print: AnimaPsych',
          text: 'Designul unei reclame print pentru promovarea serviciilor AnimaPsych în reviste de specialitate.',
          images: [
            { 
              src:ReclamaPrint, alt: 'AnimaPsych Reclama Print' 
            }
          ]          
        },
        {
          title: 'Reclama audio: AnimaPsych',
          text: 'Designul unei reclame audio pentru promovarea serviciilor AnimaPsych în reviste de specialitate.',
          audio: ReclamaAudio
        },
        {
          title: 'Reclama video: AnimaPsych',
          text: 'Designul unei reclame video pentru promovarea serviciilor AnimaPsych în reviste de specialitate.',
          video: Reclamavideo
        },
        {
          title: 'Tutorial video: AnimaPsych',
          text: 'Designul unui tutorial video pentru promovarea serviciilor AnimaPsych în reviste de specialitate.',
          video: TutorialVideo
        },
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
      text: 'Ești gata să schimbi dinamica în casa ta? Contactează-ne:\n**Telefon:** 0712 345678\n**Email:** irinabut2024_@gmail.com\n**LinkedIn:** https://www.linkedin.com/in/anima-psych-6a4b093a1/\n**Instagram:** https://www.instagram.com/anima_psych/\n**Facebook:** https://www.facebook.com/profile.php?id=61585400849025\n**Website:** https://irinabut2024-stud.github.io/animapsych'
    }
  }

  const tabs = [
    { key: 'home', label: 'Acasă' },
    { key: 'despre', label: 'Despre mine' },
    { key: 'servicii', label: 'Servicii' },
    { key: 'portofoliu', label: 'Portofoliu' },
    { key: 'blog', label: 'AI & Instrumente' },
    { key: 'contact', label: 'Contact' }
  ]

  const renderContent = () => {
    const data = content[activeTab]

    if (data.type === 'home') {
      return (
        <div className="content-home">
          <h1>{data.title}</h1>
          {data.paragraphs.map((paragraphs) => (
              <p>{paragraphs.text}</p>
          ))}
        </div>
      )
    }

    if (data.type === 'multi-section') {
      return (
        <div className="content-multi-section">
          {data.title && <h1>{data.title}</h1>}
          {data.text && <div className="intro-text">{parseFormattedText(data.text)}</div>}
          {data.sections.map((section, idx) => (
            <section key={idx} className="content-section">
              <h2>{section.title}</h2>
              {section.text && <div>{parseFormattedText(section.text)}</div>}
              {/* images wrapper: single class that contains all images from the list */}
              {Array.isArray(section.images) && section.images.length > 0 && (
                <div className="section-images">
                  {section.images.map((image, i) => (
                    <img
                      key={i}
                      src={image.src}
                      alt={image.alt || `Section Image ${i + 1}`}
                      className="section-image"
                      onClick={() => openLightbox(image.src)} style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              )}
              {section.pdf && (
                <div className="section-pdf-wrap">
                  <a
                    className="pdf-link"
                    href={section.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    View / Download PDF
                  </a>

                  <div className="pdf-embed">
                    <iframe
                      src={section.pdf}
                      title={`${section.title} PDF`}
                      className="section-pdf"
                    />
                  </div>
                </div>
              )}
              {section.video && (
                <div className="section-video">
                  {(() => {
                    const embed = getVideoEmbedUrl(section.video);
                    if (embed) {
                      return (
                        <div className="video-embed">
                          <iframe
                            src={embed}
                            title={`${section.title} video`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      );
                    }

                    // native video file (mp4/webm)
                    return (
                      <video controls className="native-video" src={section.video}>
                        Your browser does not support the video tag. <a href={section.video}>Open video</a>
                      </video>
                    );
                  })()}
                </div>
              )}
              {section.audio && (
                <div className="section-audio">
                  <audio
                    className="native-audio"
                    controls
                    preload="metadata"
                    src={section.audio}
                    aria-label={`${section.title} audio`}
                  />
                  <div className="audio-fallback">
                    <a href={section.audio} target="_blank" rel="noopener noreferrer" download>Open / Download audio</a>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      )
    }

    if (data.type === 'simple') {
      return (
        <div className="content-simple">
          <h2>{data.title}</h2>
          <p>{parseFormattedText(data.text)}</p>
        </div>
      )
    }
  }

  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1>AnimaPsych</h1>
        <h2>Descifrăm instinctele pentru a construi conexiuni: Psihologie aplicată dincolo de cuvinte, de la om la animal.</h2>

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

      <footer className="disclaimer-footer">
        <p>
          <strong>Disclaimer:</strong>  AI Generated Content | Proiect Academic realizat în cadrul Facultății de Psihologie.
        </p>
      </footer>

      {lightboxSrc && (

      <div className="lightbox-overlay" onClick={closeLightbox}> <div className="lightbox-content" onClick={(e) => e.stopPropagation()}> <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">X</button> <img src={lightboxSrc} alt="" className="lightbox-image" /> </div> </div> )}
    </>
  )
}

export default App