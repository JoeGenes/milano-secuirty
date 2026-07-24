import React, { useState } from 'react';
import { Phone, MessageSquare, Globe, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Header({ currentPage, setCurrentPage, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  const mainPages = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'coverage', label: t.nav.coverage },
    { id: 'industries', label: t.nav.industries }
  ];


  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#FFFFFF' }}>
      {/* Top Utility Bar */}
      <div style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: 'clamp(0.65rem, 2vw, 0.8rem)', padding: 'clamp(0.3rem, 1vw, 0.45rem) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(0.3rem, 2vw, 0.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)', flexWrap: 'wrap' }}>
            <span style={{ color: '#0A0B3D', fontWeight: '700', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', letterSpacing: '0.05em', backgroundColor: 'rgba(10, 11, 61, 0.06)', padding: '0.15rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(10, 11, 61, 0.15)' }}>
              BRELA REG #154815619
            </span>
            <span className="hide-mobile" style={{ color: '#475569', fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)', whiteSpace: 'nowrap' }}>
              Dodoma HQ: {COMPANY_INFO.headquarters}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.6rem, 2vw, 1.2rem)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 'clamp(0.3rem, 1.5vw, 0.6rem)', alignItems: 'center' }}>
              <button onClick={() => handleNavigate('careers')} style={{ background: 'none', border: 'none', color: '#0A0B3D', fontWeight: 700, cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)' }}>{t.nav.careers}</button>
              <button onClick={() => handleNavigate('contact')} style={{ background: 'none', border: 'none', color: '#0A0B3D', fontWeight: 700, cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)' }}>{t.nav.contact}</button>
            </div>

            {/* Language Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
              <Globe size={12} style={{ color: '#0A0B3D' }} />
              <button 
                onClick={() => setLang('en')} 
                style={{ background: 'none', border: 'none', color: lang === 'en' ? '#0A0B3D' : '#64748B', fontWeight: lang === 'en' ? 'bold' : 'normal', cursor: 'pointer', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)' }}
              >
                EN
              </button>
              <span style={{ color: '#CBD5E1', fontSize: '0.7rem' }}>|</span>
              <button 
                onClick={() => setLang('sw')} 
                style={{ background: 'none', border: 'none', color: lang === 'sw' ? '#0A0B3D' : '#64748B', fontWeight: lang === 'sw' ? 'bold' : 'normal', cursor: 'pointer', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)' }}
              >
                SW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <nav style={{ backgroundColor: '#FFFFFF', borderBottom: '2px solid #0A0B3D', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'clamp(60px, 12vw, 76px)', padding: 'clamp(0.75rem, 2vw, 1rem) 1.5rem' }}>
          
          {/* Official Logo Component */}
          <div onClick={() => handleNavigate('home')} style={{ cursor: 'pointer', minWidth: '0' }}>
            <Logo size={46} showText={true} />
          </div>

          {/* Desktop Nav Links */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0rem, 1.5vw, 0.3rem)', marginLeft: 'auto' }}>
            {mainPages.map(page => (
              <button
                key={page.id}
                onClick={() => handleNavigate(page.id)}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '700',
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.5rem, 1.5vw, 0.85rem)',
                  border: 'none',
                  background: 'transparent',
                  color: currentPage === page.id ? '#0A0B3D' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: currentPage === page.id ? '3px solid #0A0B3D' : '3px solid transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                {page.label}
              </button>
            ))}

            {/* Request a Quote Button - Deep Navy #0A0B3D */}
            <button
              onClick={() => handleNavigate('quote')}
              className="btn btn-navy"
              style={{ borderRadius: '50px', padding: 'clamp(0.5rem, 1.5vw, 0.65rem) clamp(0.8rem, 2vw, 1.4rem)', marginLeft: 'clamp(0.4rem, 1.5vw, 0.8rem)', backgroundColor: '#0A0B3D', fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)', whiteSpace: 'nowrap' }}
            >
              Request a Quote
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="show-mobile-only"
            style={{ background: 'none', border: 'none', color: '#0A0B3D', cursor: 'pointer', padding: '0.5rem', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
          >
            {mobileMenuOpen ? <X size={26} style={{ color: '#0A0B3D' }} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="show-mobile-only animate-fade-in" style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            padding: 'clamp(0.75rem, 2vw, 1.2rem) clamp(0.75rem, 2vw, 1.5rem)',
            maxHeight: '75vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.3rem, 1.5vw, 0.5rem)' }}>
              <div style={{ display: 'flex', gap: 'clamp(0.3rem, 1.5vw, 0.5rem)', marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)', flexWrap: 'wrap' }}>
                <a href={`tel:${COMPANY_INFO.telephones[0]}`} style={{ padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.4rem, 1.5vw, 0.6rem)', border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', color: '#0A0B3D', fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', whiteSpace: 'nowrap' }}>Call {COMPANY_INFO.telephones[0]}</a>
                <a href={`https://wa.me/${COMPANY_INFO.whatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.4rem, 1.5vw, 0.6rem)', border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', color: '#16A34A', fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)' }}>WhatsApp</a>
              </div>
              {mainPages.map(page => (
                <button
                  key={page.id}
                  onClick={() => handleNavigate(page.id)}
                  style={{
                    textAlign: 'left',
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.6rem, 2vw, 1rem)',
                    background: currentPage === page.id ? 'rgba(10, 11, 61, 0.08)' : '#F8FAFC',
                    color: currentPage === page.id ? '#0A0B3D' : '#475569',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'uppercase'
                  }}
                >
                  {page.label}
                </button>
              ))}

              <button
                onClick={() => handleNavigate('quote')}
                className="btn btn-navy"
                style={{ width: '100%', marginTop: 'clamp(0.3rem, 1vw, 0.5rem)', backgroundColor: '#0A0B3D', padding: 'clamp(0.6rem, 1.5vw, 0.75rem) 1.2rem' }}
              >
                Request a Quote
              </button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 991px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: block !important; }
        }
        @media (min-width: 992px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
