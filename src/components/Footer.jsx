import React from 'react';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Footer({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#FFFFFF', color: '#0A0B3D', paddingTop: 'clamp(2rem, 5vw, 4.5rem)', borderTop: '2px solid #0A0B3D' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          
          {/* Col 1: Official Logo & BRELA Legal Notice */}
          <div>
            <div style={{ marginBottom: 'clamp(0.75rem, 2vw, 1.2rem)' }} onClick={() => handleNavigate('home')}>
              <Logo size={42} showText={true} />
            </div>
            
            <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)', color: '#64748B', lineHeight: '1.6', marginBottom: 'clamp(0.9rem, 2vw, 1.5rem)' }}>
              {COMPANY_INFO.slogan}
            </p>

            <div style={{ background: '#F8FAFC', borderRadius: '6px', padding: 'clamp(0.7rem, 2vw, 1rem)', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', fontWeight: 'bold', color: '#0A0B3D', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase' }}>
                <CheckCircle2 size={13} /> BRELA Registration
              </div>
              <div style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', color: '#475569', lineHeight: '1.5' }}>
                <strong>Legal Name:</strong> {COMPANY_INFO.brelaName}<br />
                <strong>Company No:</strong> {COMPANY_INFO.companyNumber}<br />
                <strong>PDPC Reg:</strong> {COMPANY_INFO.pdpc}
              </div>
            </div>
          </div>

          {/* Col 2: Our Services */}
          <div>
            <h4 style={{ color: '#0A0B3D', fontSize: 'clamp(0.78rem, 1.5vw, 0.9rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.2rem)', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 1vw, 0.6rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)' }}>
              {[
                { id: 'services', label: 'Manned Guarding' },
                { id: 'services', label: 'Mobile Patrol & Response' },
                { id: 'services', label: 'CCTV & Alarm Systems' },
                { id: 'services', label: 'Access Control Systems' },
                { id: 'services', label: 'Electric Fencing Protection' },
                { id: 'services', label: 'K9 Security & Handlers' },
                { id: 'services', label: 'Fire Safety & Extinguishers' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleNavigate(item.id)}
                    style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: 'inherit', transition: '0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#0A0B3D'}
                    onMouseOut={(e) => e.target.style.color = '#475569'}
                  >
                    › {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Other Links */}
          <div>
            <h4 style={{ color: '#0A0B3D', fontSize: 'clamp(0.78rem, 1.5vw, 0.9rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.2rem)', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Other Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 1vw, 0.6rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)' }}>
              {[
                { id: 'support', label: t.nav.support },
                { id: 'terms', label: t.nav.terms },
                { id: 'clients', label: t.nav.clients },
                { id: 'licences', label: t.nav.licences },
                { id: 'careers', label: t.nav.careers },
                { id: 'privacy', label: t.nav.privacy },
                { id: 'applicant-privacy', label: t.nav.applicantPrivacy }
              ].map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavigate(item.id)}
                    style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: 'inherit', transition: '0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#0A0B3D'}
                    onMouseOut={(e) => e.target.style.color = '#475569'}
                  >
                    › {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h4 style={{ color: '#0A0B3D', fontSize: 'clamp(0.78rem, 1.5vw, 0.9rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.2rem)', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Reach Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.5vw, 0.9rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: '#475569' }}>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <MapPin size={16} style={{ color: '#0A0B3D', flexShrink: 0, marginTop: '0.2rem' }} />
                <span>{COMPANY_INFO.headquarters}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <Phone size={16} style={{ color: '#0A0B3D', flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  {COMPANY_INFO.telephones.map(p => <div key={p}>{p}</div>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <Mail size={16} style={{ color: '#0A0B3D', flexShrink: 0, marginTop: '0.2rem' }} />
                <span>{COMPANY_INFO.emails[0]}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: 'clamp(0.75rem, 2vw, 1.2rem) 0', textAlign: 'center', fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)', color: '#64748B' }}>
        <div className="container">
          <p>{COMPANY_INFO.brelaName} &bull; BRELA Reg No. 154815619 &bull; {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
