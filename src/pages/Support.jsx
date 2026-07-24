import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

const SUPPORT_EMAIL = 'support@milanosecurity.co.tz';

export default function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Service Complaint',
    region: 'Dodoma',
    details: '',
    privacyConsent: false
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    setSubmissionError('');

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const region = formData.region.trim();
    const details = formData.details.trim();
    const consentGiven = formData.privacyConsent;

    if (!name || !phone || !email || !region || !details || !consentGiven) {
      setSubmissionError('Please complete all required fields and confirm the Privacy Notice.');
      return;
    }

    if (!validateEmail(email)) {
      setSubmissionError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/support/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          category: formData.category,
          region,
          details,
          privacyConsent: formData.privacyConsent ? 'true' : 'false'
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        setSubmissionError(result.message || 'Unable to submit your request. Please try again later.');
        setSubmitting(false);
        return;
      }

      const newTicketId = `TKT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(newTicketId);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'Service Complaint',
        region: 'Dodoma',
        details: '',
        privacyConsent: false
      });
      alert(`Your report has been sent successfully. Reference: ${newTicketId}`);
    } catch (error) {
      setSubmissionError('Unable to submit your request right now. Please try again later.');
      console.error('Support submit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: '4rem 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Support & Complaints</span>
          <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Professional Support and Complaint Reporting
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '780px', marginTop: '0.8rem', lineHeight: '1.75' }}>
            Submit operational complaints, technical support requests or service feedback. Milano Security will review each report carefully and follow up with a monitored response.
          </p>
        </div>
      </section>

      <section style={{ padding: '4.5rem 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '2.5rem', background: '#FFF' }}>
              <span className="badge badge-navy" style={{ marginBottom: '1rem' }}>Support Details</span>
              <h2 style={{ fontSize: '1.6rem', color: '#0A0B3D', marginBottom: '1rem' }}>Milano Security Customer Support</h2>
              <p style={{ color: '#475569', lineHeight: '1.75', marginBottom: '1.75rem' }}>
                Use this form for complaints, service quality reports, system support requests, and general feedback to our operations team.
              </p>

              <div style={{ display: 'grid', gap: '1.25rem', fontSize: '0.95rem', color: '#151821' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <MapPin size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Head Office</strong><br />
                    <span style={{ color: '#5A6072' }}>{COMPANY_INFO.headquarters}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Phone size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>24/7 Control Room</strong><br />
                    <span style={{ color: '#5A6072' }}>{COMPANY_INFO.telephones[0]}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Mail size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Email</strong><br />
                    <span style={{ color: '#5A6072' }}>{SUPPORT_EMAIL}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Clock size={22} className="text-navy" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong>Response Time</strong><br />
                    <span style={{ color: '#5A6072' }}>Our team aims to acknowledge every report within one business day.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsApp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ width: '100%', backgroundColor: '#25D366', color: '#FFF', justifyContent: 'center' }}
                >
                  <MessageSquare size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="card" style={{ padding: '2.5rem', background: '#FFF' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#0A0B3D', marginBottom: '1.5rem' }}>Submit a Support Request</h2>
              <form onSubmit={handleSubmitComplaint}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+255 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Issue Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-control"
                    >
                      <option value="Service Complaint">Guard Performance / Service Complaint</option>
                      <option value="CCTV / Alarm Technical Support">CCTV / Alarm Technical Support</option>
                      <option value="Billing / Invoice Query">Billing / Invoice Query</option>
                      <option value="General Feedback">General Feedback & Commendation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Location Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dodoma, Dar es Salaam"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Details of Complaint or Support Request *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide specific details, including date, location, and any incident reference."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginTop: '1.25rem' }}>
                  <input
                    id="privacyConsent"
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    style={{ marginTop: '0.25rem' }}
                  />
                  <label htmlFor="privacyConsent" style={{ color: '#475569', lineHeight: '1.7' }}>
                    I have read and agree to the Milano Security Privacy Notice.
                  </label>
                </div>

                {submissionError && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', color: '#B91C1C' }}>
                    {submissionError}
                  </div>
                )}

                <button type="submit" className="btn btn-navy" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }} disabled={submitting}>
                  {submitting ? 'Sending your request...' : 'Submit Request'} <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
