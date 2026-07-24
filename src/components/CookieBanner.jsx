import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function CookieBanner({ lang }) {
  const [visible, setVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const consent = localStorage.getItem('milano_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('milano_cookie_consent', 'accepted_all');
    setVisible(false);
  };

  const handleRejectOptional = () => {
    localStorage.setItem('milano_cookie_consent', 'essential_only');
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('milano_cookie_consent', JSON.stringify(preferences));
    setShowSettingsModal(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Bottom Sticky Cookie Banner */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#050624',
        color: '#FFF',
        borderTop: '2px solid #E7AD18',
        padding: '1.2rem 1.5rem',
        zIndex: 1800,
        boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 500px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(231,173,24,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Cookie size={22} className="text-navy" />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '0.92rem', color: '#E7AD18', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} /> Privacy & Cookie Preference (PDPC Reg. No. 0-000-010-187)
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
                {lang === 'en' 
                  ? 'We use essential cookies to operate our site safely. Optional analytics cookies help us improve service quality in accordance with Tanzanian Data Protection Laws.' 
                  : 'Tunatumia vidakuzi vya lazima kuendesha tovuti kwa usalama. Vidakuzi vya hiari vinatusaidia kuboresha huduma kulingana na Sheria za Hifadhi ya Data Tanzania.'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button onClick={handleAcceptAll} className="btn btn-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
              {t.buttons.acceptCookies}
            </button>
            <button onClick={handleRejectOptional} className="btn btn-outline-white" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
              {t.buttons.rejectOptional}
            </button>
            <button onClick={() => setShowSettingsModal(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
              <Settings size={14} /> Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ color: '#0A0B3D', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings className="text-navy" /> Cookie Preferences
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#5A6072', marginBottom: '1.5rem' }}>
              Customize your privacy settings below. Essential cookies cannot be disabled as they are required for security and core functionality.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', background: '#F3F5F7', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem' }}>Strictly Essential Cookies</strong>
                  <span style={{ fontSize: '0.8rem', color: '#5A6072' }}>Required for site navigation, forms, and PDPC data protection.</span>
                </div>
                <span className="badge badge-gold">Always Active</span>
              </div>

              <div style={{ padding: '1rem', background: '#F3F5F7', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem' }}>Analytics & Performance Cookies</strong>
                  <span style={{ fontSize: '0.8rem', color: '#5A6072' }}>Helps us measure site traffic and quotation request performance.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
              <button onClick={() => setShowSettingsModal(false)} className="btn btn-outline-navy" style={{ padding: '0.6rem 1.2rem' }}>
                Cancel
              </button>
              <button onClick={handleSavePreferences} className="btn btn-gold" style={{ padding: '0.6rem 1.4rem' }}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
