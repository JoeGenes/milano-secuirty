import React from 'react';
import { Cookie, Shield, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function CookieNotice({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: '4rem 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Cookie Transparency Policy</span>
          <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Cookie Notice
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '800px', marginTop: '0.8rem', lineHeight: '1.6' }}>
            Explaining how Milano Security Service Limited uses essential and optional web cookies to optimize your site browsing experience.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFF' }}>
        <div className="container">
          <div className="card" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: '#151821' }}>
            
            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              1. What Are Cookies?
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Cookies are small text files placed on your browser or device when you visit our website. They help us verify active user sessions, remember language preferences (English or Kiswahili), and secure our online quotation and contact forms.
            </p>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              2. Categories of Cookies We Use
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.2rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong style={{ color: '#0A0B3D', fontSize: '1rem', display: 'block', marginBottom: '0.3rem' }}>
                  A. Essential Security & Operational Cookies (Mandatory)
                </strong>
                <span style={{ fontSize: '0.88rem', color: '#5A6072' }}>
                  These cookies are necessary for core security features, form session tokens, and PDPC compliance tracking. They cannot be turned off.
                </span>
              </div>

              <div style={{ padding: '1.2rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong style={{ color: '#0A0B3D', fontSize: '1rem', display: 'block', marginBottom: '0.3rem' }}>
                  B. Preference & Analytics Cookies (Optional)
                </strong>
                <span style={{ fontSize: '0.88rem', color: '#5A6072' }}>
                  These cookies remember your selected language (English / Kiswahili) and provide anonymous statistical insights into page traffic across our 12 Tanzanian operational regions.
                </span>
              </div>
            </div>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              3. Managing Cookie Preferences
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              You can modify or withdraw optional cookie permissions at any time using our bottom Cookie Consent Banner or through your web browser security settings.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
