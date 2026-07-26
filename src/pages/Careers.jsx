import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, CheckCircle2, Upload, AlertCircle, Shield, X, Send, Mail, Clock, Sparkles } from 'lucide-react';
import { COMPANY_INFO, COVERAGE_REGIONS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

function formatDate(value) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  return isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

const STORAGE_KEY = 'milano_hr_job_ads';
const LEGACY_DEFAULT_JOB_IDS = ['job-1', 'job-2', 'job-3'];

function loadPublishedJobs() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    const jobs = Array.isArray(parsed) ? parsed : [];
    const filteredJobs = jobs.filter((job) => !LEGACY_DEFAULT_JOB_IDS.includes(job.id));

    if (filteredJobs.length !== jobs.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredJobs));
    }

    return filteredJobs;
  } catch {
    return [];
  }
}

export default function Careers({ setCurrentPage, lang }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [publicJobs, setPublicJobs] = useState(loadPublishedJobs);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    region: 'Dodoma',
    education: 'Form IV Certificate (CSEE)',
    experience: '',
    coverMessage: '',
    privacyConsent: false,
    cvFileName: ''
  });

  useEffect(() => {
    setPublicJobs(loadPublishedJobs());
  }, []);

  const t = TRANSLATIONS[lang];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setSubmitted(false);
    setSubmitMessage('');
    setSubmitError('');
    setCvFile(null);
    setFormData(prev => ({ ...prev, fullName: '', phone: '', email: '', region: 'Dodoma', education: 'Form IV Certificate (CSEE)', experience: '', coverMessage: '', privacyConsent: false, cvFileName: '' }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(file);
      setFormData({ ...formData, cvFileName: file.name });
    }
  };

  const openJobPdf = (job) => {
    if (job?.pdfDataUrl) {
      window.open(job.pdfDataUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (job?.pdfFileName) {
      setSubmitError('This PDF attachment is not available in the current browser session.');
    }
  };

  const getPdfDownloadName = (job) => job?.pdfFileName || 'job-brief.pdf';

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setSubmitError('Please complete your full name, phone number, and email address before submitting.');
      return;
    }

    if (!formData.privacyConsent) {
      setSubmitError('Please acknowledge the Applicant Privacy Notice before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      const payload = new FormData();
      payload.append('fullName', formData.fullName.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('email', formData.email.trim());
      payload.append('region', formData.region);
      payload.append('education', formData.education);
      payload.append('experience', formData.experience.trim());
      payload.append('coverMessage', formData.coverMessage.trim());
      payload.append('privacyConsent', formData.privacyConsent ? 'true' : 'false');
      payload.append('positionTitle', selectedJob.title);
      payload.append('positionLocation', selectedJob.location);
      payload.append('companyName', COMPANY_INFO.brandName);

      if (cvFile) {
        payload.append('cv', cvFile);
      }

      const response = await fetch('/api/careers/submit', {
        method: 'POST',
        body: payload
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Submission failed');
      }

      if (result.mailtoLink) {
        const popUp = window.open(result.mailtoLink, '_blank', 'noopener,noreferrer');
        if (!popUp) {
          window.location.href = result.mailtoLink;
        }
      }

      setSubmitMessage(result.message || 'Your application was submitted successfully.');
      setSubmitted(true);
    } catch (error) {
      console.error('Career application submission failed:', error);
      setSubmitError('The application could not be delivered automatically. Please contact HR directly at ' + COMPANY_INFO.emails[0] + '.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <section style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(1.2rem, 3vw, 2rem)', alignItems: 'center' }}>
            <div>
              <span className="badge badge-navy" style={{ marginBottom: '1rem' }}>Join Our Security Team</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', color: '#FFF', fontFamily: 'Montserrat, sans-serif', marginBottom: '1rem' }}>
                Professional careers at Milano Security
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', lineHeight: '1.8', maxWidth: '720px' }}>
                We are recruiting dependable professionals for guarding, technical security, and specialist operations across Tanzania. Applications are reviewed by our HR team and acknowledged by email.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: '1.3rem', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#DCE4FF' }}>Recruitment portal</div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>Secure, guided, and HR-ready</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.8rem' }}>
                {['Fast review', 'Email notification', 'Privacy-safe', 'Merit-based'].map((item) => (
                  <div key={item} style={{ padding: '0.8rem 0.9rem', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '0.92rem' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(0.9rem, 2vw, 1.2rem) 0', backgroundColor: '#FFF8E6', borderBottom: '1px solid #F1D79A' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.8rem', color: '#8A5A00', fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>
              <strong>Recruitment security notice:</strong> Please use only this official portal. Never send money or documents to unauthorized contacts.
            </span>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto clamp(1.8rem, 3vw, 3rem) auto' }}>
            <span className="badge badge-navy" style={{ marginBottom: '0.6rem' }}>Open Vacancies</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', color: '#0A0B3D' }}>Current career opportunities</h2>
            <p style={{ color: '#5A6072', marginTop: '0.7rem', lineHeight: '1.7' }}>
              Browse current vacancies and submit your application directly through our portal. HR receives the submission instantly and can respond by email.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {publicJobs.map(job => (
              <div key={job.id} className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 2rem)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: '#0A0B3D', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                      {job.title}
                    </h3>
                    <span className="badge badge-navy">{job.type}</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#5A6072', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={14} className="text-navy" /> {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={14} className="text-navy" /> Published: {formatDate(job.publishedOn)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Shield size={14} className="text-navy" /> Apply by: {job.deadline ? formatDate(job.deadline) : 'Open until filled'}
                    </span>
                  </div>

                  <p style={{ color: '#151821', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                    {job.desc}
                  </p>

                  <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0A0B3D', marginBottom: '0.5rem' }}>Key requirements:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.88rem', color: '#5A6072' }}>
                    {job.requirements.map((req, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={15} className="text-navy" style={{ flexShrink: 0 }} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: '0.7rem', alignItems: 'flex-start', width: '100%', maxWidth: '220px' }}>
                  <button onClick={() => handleApplyClick(job)} className="btn btn-navy" style={{ padding: '0.85rem 1.8rem' }}>
                    Apply for Position
                  </button>
                  {(job.pdfFileName || job.pdfDataUrl) && (
                    <a
                      href={job.pdfDataUrl || '#'}
                      download={getPdfDownloadName(job)}
                      className="btn btn-navy"
                      style={{ padding: '0.6rem 0.95rem', fontSize: '0.9rem', background: '#eee', borderColor: '#eee', color: '#0A0B3D' }}
                    >
                      <Upload size={15} style={{ marginRight: '0.45rem' }} />
                      Download PDF
                    </a>
                  )}
                  {job.pdfFileName && (
                    <div style={{ color: '#0A0B3D', fontSize: '0.84rem', fontWeight: '700' }}>
                      {job.pdfFileName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '680px' }}>
            <button
              onClick={() => setSelectedJob(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#0A0B3D' }}
            >
              <X size={24} />
            </button>

            {!submitted ? (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="badge badge-navy" style={{ marginBottom: '0.4rem' }}>Online Recruitment Portal</span>
                  <h3 style={{ fontSize: '1.5rem', color: '#0A0B3D', margin: 0 }}>
                    Apply for {selectedJob.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem', color: '#5A6072', fontSize: '0.85rem' }}>
                    <span>Location: {selectedJob.location}</span>
                    <span>Published: {formatDate(selectedJob.publishedOn)}</span>
                    <span>Apply by: {selectedJob.deadline ? formatDate(selectedJob.deadline) : 'Open until filled'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0A0B3D', fontSize: '0.85rem', fontWeight: '700' }}>
                  <Mail size={15} />
                  <span>HR notifications are sent directly to the Milanosecurity recruitment inbox.</span>
                </div>

                {(selectedJob.pdfFileName || selectedJob.pdfDataUrl) && (
                  <div style={{ marginBottom: '1rem', padding: '0.9rem', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #D8E1EA' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0A0B3D', marginBottom: '0.35rem' }}>Job brief</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
                      <a
                        href={selectedJob.pdfDataUrl || '#'}
                        download={getPdfDownloadName(selectedJob)}
                        className="btn btn-navy"
                        style={{ padding: '0.55rem 0.85rem', fontSize: '0.88rem', background: '#eee', borderColor: '#eee', color: '#0A0B3D' }}
                      >
                        <Upload size={15} style={{ marginRight: '0.45rem' }} />
                        Download PDF
                      </a>
                    </div>
                    {selectedJob.pdfFileName && (
                      <div style={{ marginTop: '0.45rem', color: '#5A6072', fontSize: '0.84rem' }}>{selectedJob.pdfFileName}</div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmitApplication}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Peter Mtaki"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="form-control"
                      />
                    </div>

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
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="applicant@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>Region of Residence *</label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="form-control"
                      >
                        {COVERAGE_REGIONS.map(r => (
                          <option key={r.name} value={r.name}>{r.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Education Level</label>
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="form-control"
                    >
                      <option value="Form IV Certificate">Form IV Certificate (CSEE)</option>
                      <option value="Form VI Certificate">Form VI Certificate (ACSEE)</option>
                      <option value="VETA / Diploma Certificate">VETA / Diploma Certificate</option>
                      <option value="Bachelor Degree">Bachelor Degree</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Attach Curriculum Vitae (CV) *</label>
                    <div style={{ border: '2px dashed #CBD5E1', borderRadius: '8px', padding: '1.2rem', textAlign: 'center', backgroundColor: '#F8FAFC' }}>
                      <Upload size={24} color="#5A6072" style={{ marginBottom: '0.4rem' }} />
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="cv-upload-input"
                      />
                      <label htmlFor="cv-upload-input" style={{ cursor: 'pointer', color: '#0A0B3D', fontWeight: 'bold', display: 'block' }}>
                        Click to select CV document (.pdf / .doc)
                      </label>
                      {formData.cvFileName && (
                        <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: '0.4rem', fontWeight: 'bold' }}>
                          ✓ Attached: {formData.cvFileName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your experience, availability, or any relevant background."
                      value={formData.coverMessage}
                      onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: '#F3F5F7', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', fontSize: '0.82rem', color: '#151821' }}>
                      <input
                        type="checkbox"
                        required
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        style={{ marginTop: '0.2rem' }}
                      />
                      <span>
                        <strong>Applicant Privacy Acknowledgement:</strong> I confirm that all provided information is accurate and that I have read the <button type="button" onClick={() => { setSelectedJob(null); setCurrentPage('applicant-privacy'); }} style={{ color: '#0A0B3D', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Applicant Privacy Notice</button>. I consent to background checks and verification.
                      </span>
                    </label>
                  </div>

                  {submitError && (
                    <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', borderRadius: '8px', background: '#FEF2F2', color: '#991B1B', fontSize: '0.9rem' }}>
                      {submitError}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '0.8rem' }}>
                    <button type="button" onClick={() => setSelectedJob(null)} className="btn btn-outline-navy">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-navy" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.8 : 1 }}>
                      {isSubmitting ? 'Submitting...' : <>Submit Application <Send size={16} /></>}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem auto' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#0A0B3D', marginBottom: '0.6rem' }}>Application Submitted Successfully</h3>
                <p style={{ color: '#5A6072', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Your application for <strong>{selectedJob.title}</strong> has been received by Milano Security HR Department.
                </p>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#0A0B3D', marginBottom: '1rem' }}>
                  Application Reference: <strong>APP-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
                </div>
                {submitMessage && (
                  <div style={{ marginBottom: '1.2rem', padding: '0.9rem 1rem', borderRadius: '8px', background: '#ECFDF3', color: '#166534', fontSize: '0.9rem' }}>
                    {submitMessage}
                  </div>
                )}
                <button onClick={() => setSelectedJob(null)} className="btn btn-navy">
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
