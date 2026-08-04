import React, { useState } from 'react';
import { FileText, Shield, CheckCircle2, Calculator, Send, ArrowRight, Building, Phone, Mail } from 'lucide-react';
import { SERVICES, COVERAGE_REGIONS, INDUSTRIES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Quotation({ setCurrentPage, lang }) {
  const [step, setStep] = useState(1);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    customerType: 'Commercial Business',
    region: 'Dodoma',
    premisesType: 'Office Complex',
    selectedServices: ['Manned Guarding'],
    urgency: 'Standard (Within 1 week)',
    name: '',
    phone: '',
    email: '',
    description: '',
    privacyConsent: false
  });

  const t = TRANSLATIONS[lang];
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  const renderError = (fieldName) => errors[fieldName] ? (
    <div style={{ color: '#B91C1C', fontSize: '0.8rem', marginTop: '0.4rem' }}>{errors[fieldName]}</div>
  ) : null;

  const validateStep = (currentStep) => {
    const nextErrors = {};

    if (currentStep === 1) {
      if (!formData.customerType) nextErrors.customerType = 'Please select a customer category.';
      if (!formData.region) nextErrors.region = 'Please select a region.';
      if (!formData.premisesType) nextErrors.premisesType = 'Please select a premises type.';
      if (!formData.urgency) nextErrors.urgency = 'Please select an urgency level.';
    }

    if (currentStep === 2) {
      if (!formData.selectedServices || formData.selectedServices.length === 0) {
        nextErrors.selectedServices = 'Please select at least one service.';
      }
    }

    if (currentStep === 3) {
      if (!formData.name.trim()) nextErrors.name = 'Please enter your name or organisation.';
      if (!formData.phone.trim()) nextErrors.phone = 'Please enter a phone number.';
      if (!formData.email.trim()) nextErrors.email = 'Please enter an email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email address.';
      if (!formData.privacyConsent) nextErrors.privacyConsent = 'Please accept the privacy notice before submitting.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleServiceToggle = (serviceTitle) => {
    if (formData.selectedServices.includes(serviceTitle)) {
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter(s => s !== serviceTitle)
      });
    } else {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, serviceTitle]
      });
    }
  };

  const handleNextStep = (nextStep) => {
    if (validateStep(step)) {
      setStep(nextStep);
      setErrors({});
    }
  };

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const buildClientMailto = () => {
      const recipient = 'sales@milanosecurity.co.tz';
      const subject = encodeURIComponent(`New Quotation Request – ${formData.name}`);
      const bodyLines = [
        `Name / Organisation: ${formData.name}`,
        `Phone: ${formData.phone}`,
        `Email: ${formData.email}`,
        `Region: ${formData.region}`,
        `Customer Category: ${formData.customerType} (${formData.premisesType})`,
        `Urgency: ${formData.urgency}`,
        `Requested Services: ${(formData.selectedServices || []).join(', ')}`,
        `Description / Instructions: ${formData.description || 'None provided'}`,
        `Company: Milano Security`
      ];
      return `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    };

    try {
      setSubmitMessage('Submitting your quotation request...');

      const res = await fetch('/api/quote/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerType: formData.customerType,
          region: formData.region,
          premisesType: formData.premisesType,
          selectedServices: formData.selectedServices,
          urgency: formData.urgency,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          description: formData.description,
          privacyConsent: formData.privacyConsent
        })
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        const fallbackLink = data.mailtoLink || buildClientMailto();
        setMailtoUrl(fallbackLink);
        setSubmitMessage(data.message || 'Quotation summary prepared. Click below to send via your email app.');
        setQuoteSubmitted(true);
        return;
      }

      if (data.fallbackMode && data.mailtoLink) {
        setMailtoUrl(data.mailtoLink);
        setSubmitMessage(data.message || 'Your quotation draft is ready to send via your email client.');
      } else {
        setMailtoUrl('');
        setSubmitMessage(data.message || 'Your quotation request was received.');
      }

      setQuoteSubmitted(true);
    } catch (err) {
      console.error('Quote submit failed:', err);
      const fallbackLink = buildClientMailto();
      setMailtoUrl(fallbackLink);
      setSubmitMessage('Quotation summary prepared. Click below to send via your email app.');
      setQuoteSubmitted(true);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: 'clamp(2rem, 5vw, 4rem) 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>Instant Security Proposal</span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Request a Security Quotation
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', maxWidth: '800px', marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)', lineHeight: '1.6' }}>
            Complete the form below to receive an official site risk assessment proposal tailored to your premises, sector, and budget.
          </p>
        </div>
      </section>

      {/* Main Quotation Form Section */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            
            {!quoteSubmitted ? (
              <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2.8rem)', background: '#FFF' }}>
                
                {/* Step Progress Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)', borderBottom: '2px solid #E2E8F0', paddingBottom: '1rem' }}>
                  <div style={{ fontWeight: 'bold', color: step >= 1 ? '#0A0B3D' : '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'clamp(0.8rem, 1.8vw, 1rem)' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 1 ? '#E7AD18' : '#CBD5E1', color: '#0A0B3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</span>
                    Requirements & Site
                  </div>
                  <div style={{ fontWeight: 'bold', color: step >= 2 ? '#0A0B3D' : '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 2 ? '#E7AD18' : '#CBD5E1', color: '#0A0B3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>2</span>
                    Service Selection
                  </div>
                  <div style={{ fontWeight: 'bold', color: step >= 3 ? '#0A0B3D' : '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= 3 ? '#E7AD18' : '#CBD5E1', color: '#0A0B3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>3</span>
                    Contact & Submit
                  </div>
                </div>

                <form onSubmit={handleSubmitQuote}>
                  {submitMessage && (
                    <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', borderRadius: '0.5rem', background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}>
                      {submitMessage}
                    </div>
                  )}
                  
                  {/* Step 1: Customer Type & Site Details */}
                  {step === 1 && (
                    <div className="animate-fade-in">
                      <h3 style={{ fontSize: '1.3rem', color: '#0A0B3D', marginBottom: '1.5rem' }}>
                        Step 1: Premise & Sector Information
                      </h3>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.2rem' }}>
                        <div className="form-group">
                          <label>Customer Category *</label>
                          <select
                            value={formData.customerType}
                            onChange={(e) => {
                              setFormData({ ...formData, customerType: e.target.value });
                              if (errors.customerType) setErrors({ ...errors, customerType: '' });
                            }}
                            className="form-control"
                            style={errors.customerType ? { borderColor: '#B91C1C' } : undefined}
                          >
                            <option value="Commercial Business">Commercial Business</option>
                            <option value="Residential Estate / House">Residential Estate / House</option>
                            <option value="Industrial & Factory">Industrial & Factory</option>
                            <option value="NGO or Public Institution">NGO or Public Institution</option>
                          </select>
                          {renderError('customerType')}
                        </div>

                        <div className="form-group">
                          <label>Location Region *</label>
                          <select
                            value={formData.region}
                            onChange={(e) => {
                              setFormData({ ...formData, region: e.target.value });
                              if (errors.region) setErrors({ ...errors, region: '' });
                            }}
                            className="form-control"
                            style={errors.region ? { borderColor: '#B91C1C' } : undefined}
                          >
                            {COVERAGE_REGIONS.map(r => (
                              <option key={r.name} value={r.name}>{r.name} Region</option>
                            ))}
                          </select>
                          {renderError('region')}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Premises Type / Industry Sector *</label>
                        <select
                          value={formData.premisesType}
                          onChange={(e) => {
                            setFormData({ ...formData, premisesType: e.target.value });
                            if (errors.premisesType) setErrors({ ...errors, premisesType: '' });
                          }}
                          className="form-control"
                          style={errors.premisesType ? { borderColor: '#B91C1C' } : undefined}
                        >
                          {INDUSTRIES.map(i => (
                            <option key={i.title} value={i.title}>{i.title}</option>
                          ))}
                        </select>
                        {renderError('premisesType')}
                      </div>

                      <div className="form-group">
                        <label>Deployment Urgency *</label>
                        <select
                          value={formData.urgency}
                          onChange={(e) => {
                            setFormData({ ...formData, urgency: e.target.value });
                            if (errors.urgency) setErrors({ ...errors, urgency: '' });
                          }}
                          className="form-control"
                          style={errors.urgency ? { borderColor: '#B91C1C' } : undefined}
                        >
                          <option value="Immediate (Within 24 Hours)">Immediate (Within 24 Hours)</option>
                          <option value="Standard (Within 1 week)">Standard (Within 1 week)</option>
                          <option value="Planning Phase (Next 30 days)">Planning Phase (Next 30 days)</option>
                        </select>
                        {renderError('urgency')}
                      </div>

                      <div style={{ textAlign: 'right', marginTop: '2rem' }}>
                        <button type="button" onClick={() => handleNextStep(2)} className="btn btn-navy">
                          Next: Select Services <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Select Security Services */}
                  {step === 2 && (
                    <div className="animate-fade-in">
                      <h3 style={{ fontSize: '1.3rem', color: '#0A0B3D', marginBottom: '1rem' }}>
                        Step 2: Choose Required Security Services
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: '#5A6072', marginBottom: '1.5rem' }}>
                        Select all physical, electronic, or specialized services required for your premises:
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
                        {SERVICES.map(s => (
                          <div
                            key={s.id}
                            onClick={() => handleServiceToggle(s.title)}
                            style={{
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1.5px solid',
                              borderColor: formData.selectedServices.includes(s.title) ? '#0A0B3D' : '#E2E8F0',
                              backgroundColor: formData.selectedServices.includes(s.title) ? 'rgba(10,11,61,0.04)' : '#FFF',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.8rem',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={formData.selectedServices.includes(s.title)}
                              onChange={() => {}}
                              style={{ width: '18px', height: '18px' }}
                            />
                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0A0B3D' }}>{s.title}</span>
                          </div>
                        ))}
                      </div>

                      {errors.selectedServices && <div style={{ color: '#B91C1C', fontSize: '0.85rem', marginBottom: '1rem' }}>{errors.selectedServices}</div>}
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', marginTop: '2rem' }}>
                        <button type="button" onClick={() => setStep(1)} className="btn btn-outline-navy">
                          Back
                        </button>
                        <button type="button" onClick={() => handleNextStep(3)} className="btn btn-navy">
                          Next: Contact Details <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact & Privacy Consent */}
                  {step === 3 && (
                    <div className="animate-fade-in">
                      <h3 style={{ fontSize: '1.3rem', color: '#0A0B3D', marginBottom: '1.5rem' }}>
                        Step 3: Contact & Submission
                      </h3>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.2rem' }}>
                        <div className="form-group">
                          <label>Full Name or Organisation *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Tanzanian Logistics Ltd"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (errors.name) setErrors({ ...errors, name: '' });
                            }}
                            className="form-control"
                            style={errors.name ? { borderColor: '#B91C1C' } : undefined}
                          />
                          {renderError('name')}
                        </div>

                        <div className="form-group">
                          <label>Telephone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+255 700 000 000"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (errors.phone) setErrors({ ...errors, phone: '' });
                            }}
                            className="form-control"
                            style={errors.phone ? { borderColor: '#B91C1C' } : undefined}
                          />
                          {renderError('phone')}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="contact@company.co.tz"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          className="form-control"
                          style={errors.email ? { borderColor: '#B91C1C' } : undefined}
                        />
                        {renderError('email')}
                      </div>

                      <div className="form-group">
                        <label>Brief Description of Property / Specific Instructions</label>
                        <textarea
                          rows={3}
                          placeholder="Provide details on premise layout, number of gates, estimated guard count, or CCTV cameras..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="form-control"
                        ></textarea>
                      </div>

                      {/* General Form Privacy Acknowledgement */}
                      <div style={{ padding: '1rem', backgroundColor: '#F3F5F7', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', fontSize: '0.82rem', color: '#151821' }}>
                          <input
                            type="checkbox"
                            required
                            checked={formData.privacyConsent}
                            onChange={(e) => {
                              setFormData({ ...formData, privacyConsent: e.target.checked });
                              if (errors.privacyConsent) setErrors({ ...errors, privacyConsent: '' });
                            }}
                            style={{ marginTop: '0.2rem' }}
                          />
                          <span>
                            <strong>General Form Acknowledgement:</strong> I confirm that I have read the <button type="button" onClick={() => setCurrentPage('privacy')} style={{ color: '#0A0B3D', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Privacy Notice</button> and understand how Milano Security will process the information submitted through this form.
                          </span>
                        </label>
                        {renderError('privacyConsent')}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setStep(2)} className="btn btn-outline-navy">
                          Back
                        </button>
                        <button type="submit" className="btn btn-gold" style={{ padding: 'clamp(0.75rem, 2vw, 0.9rem) clamp(1.2rem, 3vw, 2.2rem)' }}>
                          Submit Quotation Request <Send size={18} />
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            ) : (
              /* Submission Success View */
              <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 3rem)', textAlign: 'center', background: '#FFF' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CheckCircle2 size={42} />
                </div>

                <h2 style={{ fontSize: '1.8rem', color: '#0A0B3D', marginBottom: '0.6rem' }}>
                  Quotation Request Received
                </h2>

                <p style={{ color: '#5A6072', fontSize: '1rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                  Thank you, <strong>{formData.name}</strong>. Your quotation request has been assigned to our Dodoma Headquarters Estimating Team.
                </p>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', maxWidth: '550px', margin: '0 auto 2rem auto', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.85rem', color: '#B58308', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                    Quotation Summary Reference:
                  </div>
                  <div style={{ fontSize: '0.92rem', color: '#0A0B3D' }}>
                    <strong>Reference ID:</strong> QUO-2026-{Math.floor(100000 + Math.random() * 900000)}<br />
                    <strong>Region:</strong> {formData.region}<br />
                    <strong>Category:</strong> {formData.customerType} ({formData.premisesType})<br />
                    <strong>Requested Services:</strong> {formData.selectedServices.join(', ')}
                  </div>
                </div>

                {mailtoUrl && (
                  <div style={{ margin: '1.5rem 0' }}>
                    <a
                      href={mailtoUrl}
                      className="btn btn-gold"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 'bold' }}
                    >
                      <Mail size={18} /> Open Email App to Send Proposal
                    </a>
                  </div>
                )}

                <button onClick={() => { setQuoteSubmitted(false); setStep(1); setMailtoUrl(''); }} className="btn btn-navy">
                  Submit Another Request
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
