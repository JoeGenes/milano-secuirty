import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Building2, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Contact({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    privacyConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !phone || !email || !message || !formData.privacyConsent) {
      setSubmitError('Please complete all required fields and confirm the Privacy Notice.');
      return;
    }

    if (!validateEmail(email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          privacyConsent: formData.privacyConsent ? 'true' : 'false'
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        setSubmitError(result.message || 'Unable to send your message right now. Please try again later.');
        return;
      }

      setSubmitMessage(result.message || 'Your message has been sent successfully.');
      setFormData({ name: '', phone: '', email: '', message: '', privacyConsent: false });
    } catch (error) {
      console.error('Contact submission error:', error);
      setSubmitError('Unable to send your message right now. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: 'clamp(2rem, 5vw, 4rem) 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>Headquarters & Regional Contacts</span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Contact Milano Security
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', maxWidth: '800px', marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)', lineHeight: '1.6' }}>
            Get in touch with our principal headquarters in Dodoma or our regional operational centers across Tanzania.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.2rem, 3vw, 2.5rem)' }}>
            
            {/* Contact Information Card */}
            <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', background: '#FFF' }}>
              <span className="badge badge-navy" style={{ marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>Dodoma Headquarters</span>
              <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#0A0B3D', marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)' }}>
                Official Contact Directory
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.8rem, 2vw, 1.5rem)', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#151821' }}>
                <div style={{ display: 'flex', gap: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                  <MapPin size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Physical Address:</strong><br />
                    <span style={{ color: '#5A6072' }}>{COMPANY_INFO.headquarters}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                  <Building2 size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Postal Address:</strong><br />
                    <span style={{ color: '#5A6072' }}>{COMPANY_INFO.postalAddress}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                  <Phone size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Telephone Numbers:</strong><br />
                    <div style={{ color: '#5A6072', marginTop: '0.2rem' }}>
                      {COMPANY_INFO.telephones.map(p => <div key={p}>{p}</div>)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                  <Mail size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Official Email:</strong><br />
                    <span style={{ color: '#5A6072' }}>{COMPANY_INFO.emails[0]}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                  <Clock size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Control Room & Emergency Response:</strong><br />
                    <span style={{ color: '#5A6072' }}>24 Hours / 7 Days a Week</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'clamp(1rem, 2.5vw, 2rem)', paddingTop: 'clamp(1rem, 2vw, 1.5rem)', borderTop: '1px solid #E2E8F0' }}>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsApp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ width: '100%', backgroundColor: '#25D366', color: '#FFF', justifyContent: 'center', padding: 'clamp(0.6rem, 1.5vw, 0.75rem) 1rem' }}
                >
                  <MessageSquare size={18} /> Chat Directly on WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', background: '#FFF' }}>
              <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#0A0B3D', marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)' }}>
                Send Us a Direct Message
              </h2>

              <form onSubmit={handleSubmitContact}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" required placeholder="Full Name" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>Telephone Number *</label>
                  <input type="tel" required placeholder="+255 700 000 000" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" required placeholder="name@domain.com" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows={4} required placeholder="Write your inquiry here..." className="form-control" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>

                <div style={{ padding: '0.8rem', backgroundColor: '#F3F5F7', borderRadius: '6px', marginBottom: '1.2rem', fontSize: '0.8rem', color: '#5A6072' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.privacyConsent} onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })} style={{ marginTop: '0.2rem' }} />
                    <span>I consent to Milano Security processing my contact details in accordance with the Privacy Notice.</span>
                  </label>
                </div>

                {submitError && (
                  <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', borderRadius: '8px', background: '#FEF2F2', color: '#991B1B', fontSize: '0.9rem' }}>
                    {submitError}
                  </div>
                )}

                {submitMessage && (
                  <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', borderRadius: '8px', background: '#ECFDF3', color: '#166534', fontSize: '0.9rem' }}>
                    {submitMessage}
                  </div>
                )}

                <button type="submit" className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <>Send Message <Send size={16} /></>}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Locator Preview */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', backgroundColor: '#0A0B3D', color: '#FFF', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#FFF', marginBottom: '0.8rem' }}>Milano Security Dodoma Control Center</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'clamp(1.2rem, 3vw, 2rem)' }}>Hazina Ward, Kinyambwa Road, Dodoma, Tanzania</p>
          <div style={{ height: 'clamp(220px, 42vw, 280px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
            <iframe
              title="Milano Security Dodoma Headquarters"
              src="https://www.google.com/maps?q=Dodoma%20City%20Council%2C%20Dodoma%2C%20Tanzania&z=13&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
