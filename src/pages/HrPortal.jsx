import React, { useEffect, useMemo, useState } from 'react';
import { Briefcase, Lock, LogOut, PlusCircle, Trash2, ShieldCheck, Eye } from 'lucide-react';

const STORAGE_KEY = 'milano_hr_job_ads';
const LEGACY_DEFAULT_JOB_IDS = ['job-1', 'job-2', 'job-3'];
const DEFAULT_CREDENTIALS = {
  email: 'hr@milano',
  password: 'Milano@2026'
};

function loadStoredJobs() {
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

export default function HrPortal({ setCurrentPage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [jobs, setJobs] = useState(loadStoredJobs);
  const [draft, setDraft] = useState({
    title: '',
    location: '',
    type: 'Full-Time',
    desc: '',
    requirements: '',
    deadline: '',
    pdfFileName: '',
    pdfDataUrl: ''
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    }
  }, [jobs]);

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginForm.email.trim() === DEFAULT_CREDENTIALS.email && loginForm.password === DEFAULT_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setStatus('Welcome back. You can publish or update vacancies below.');
    } else {
      setStatus('Invalid login details. Use the default HR credentials shown below.');
    }
  };

  const handleCreateJob = async (event) => {
    event.preventDefault();
    if (!draft.title.trim() || !draft.location.trim() || !draft.desc.trim() || !draft.deadline) {
      setStatus('Please complete the title, location, description and application deadline fields.');
      return;
    }

    const newJob = {
      id: `job-${Date.now()}`,
      title: draft.title.trim(),
      location: draft.location.trim(),
      type: draft.type,
      desc: draft.desc.trim(),
      requirements: draft.requirements
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      deadline: draft.deadline,
      publishedOn: new Date().toISOString(),
      pdfFileName: draft.pdfFileName,
      pdfDataUrl: draft.pdfDataUrl
    };

    setJobs([newJob, ...jobs]);
    setDraft({ title: '', location: '', type: 'Full-Time', desc: '', requirements: '', deadline: '', pdfFileName: '', pdfDataUrl: '' });
    setStatus('Job ad published successfully. It is now visible on the public careers page.');
  };

  const handlePdfChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setStatus('Only PDF files are accepted for job attachments.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      setDraft({ ...draft, pdfFileName: file.name, pdfDataUrl: dataUrl });
      setStatus(`PDF attached: ${file.name}`);
    };
    reader.onerror = () => {
      setStatus('The PDF could not be read. Please try another file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setStatus('The selected vacancy has been removed from the published list.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    setStatus('You have been logged out.');
  };

  const previewRequirements = useMemo(() => {
    if (!draft.requirements.trim()) return ['Add bullet points below to describe requirements.'];
    return draft.requirements
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }, [draft.requirements]);

  return (
    <div className="animate-fade-in" style={{ background: '#F3F5F7', minHeight: '100%' }}>
      <section style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
            <div>
              <span className="badge badge-navy" style={{ marginBottom: '0.8rem' }}>HR Portal</span>
              <h1 style={{ fontSize: '2.3rem', color: '#FFF', marginBottom: '0.6rem' }}>Simple recruitment management</h1>
              <p style={{ maxWidth: '720px', color: 'rgba(255,255,255,0.86)', lineHeight: '1.7' }}>
                Post new vacancies, keep the careers page updated, and manage applicants in a clean internal dashboard.
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.16)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700' }}>
                <ShieldCheck size={18} />
                <span>Secure internal access</span>
              </div>
              <div style={{ marginTop: '0.4rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.82)' }}>
                {isLoggedIn ? 'Logged in as HR Operations' : 'Use the HR login panel to continue'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          {status && (
            <div style={{ marginBottom: '1.2rem', padding: '0.9rem 1rem', borderRadius: '10px', background: '#ECFDF3', color: '#166534', border: '1px solid #A7F3D0' }}>
              {status}
            </div>
          )}

          {!isLoggedIn ? (
            <div className="card" style={{ maxWidth: '560px', margin: '0 auto', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
                <Lock size={18} className="text-navy" />
                <h2 style={{ margin: 0, color: '#0A0B3D' }}>HR login</h2>
              </div>
              <p style={{ color: '#5A6072', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                This portal is for internal HR use. Use the demo credentials below to access the posting dashboard.
              </p>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="form-control" placeholder="hr@milano" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="form-control" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }}>
                  Sign in to HR Portal
                </button>
              </form>
              <div style={{ marginTop: '1rem', padding: '0.9rem', borderRadius: '10px', background: '#F8FAFC', color: '#5A6072', fontSize: '0.92rem' }}>
                Demo access: <strong>{DEFAULT_CREDENTIALS.email}</strong> / <strong>{DEFAULT_CREDENTIALS.password}</strong>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ margin: 0, color: '#0A0B3D' }}>Post a new job ad</h2>
                    <p style={{ margin: '0.35rem 0 0', color: '#5A6072' }}>Create a vacancy in seconds and publish it to the careers page.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setCurrentPage('careers')} className="btn btn-outline-navy">
                      <Eye size={16} /> View public careers
                    </button>
                    <button onClick={() => setShowCreateModal(true)} className="btn btn-navy" style={{ background: '#0A0B3D' }}>
                      <PlusCircle size={16} /> New job ad
                    </button>
                    <button onClick={handleLogout} className="btn btn-outline-navy">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>

                {showCreateModal && (
                  <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(10, 11, 29, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 20 }}>
                    <div className="modal-panel" style={{ width: '100%', maxWidth: '840px', background: '#FFF', borderRadius: '18px', padding: '2rem', position: 'relative', boxShadow: '0 22px 60px rgba(15, 23, 42, 0.25)' }}>
                      <button onClick={() => setShowCreateModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#0A0B3D' }}>
                        ✕
                      </button>
                      <div style={{ marginBottom: '1.25rem' }}>
                        <h3 style={{ margin: 0, color: '#0A0B3D' }}>Post a new job ad</h3>
                        <p style={{ color: '#5A6072', marginTop: '0.55rem' }}>Fill in the vacancy details and publish directly to the public careers page.</p>
                      </div>
                      <form onSubmit={handleCreateJob} style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div className="form-group">
                            <label>Job title</label>
                            <input type="text" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="form-control" placeholder="Security Guard / Officer" />
                          </div>
                          <div className="form-group">
                            <label>Location</label>
                            <input type="text" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} className="form-control" placeholder="Dodoma / Dar es Salaam" />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div className="form-group">
                            <label>Employment type</label>
                            <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} className="form-control">
                              <option value="Full-Time">Full-Time</option>
                              <option value="Part-Time">Part-Time</option>
                              <option value="Contract">Contract</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Application deadline</label>
                            <input type="date" value={draft.deadline} onChange={(e) => setDraft({ ...draft, deadline: e.target.value })} className="form-control" />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Short description</label>
                          <textarea rows="4" value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} className="form-control" placeholder="Describe the role, responsibilities, and value clearly." />
                        </div>

                        <div className="form-group">
                          <label>Requirements (one per line)</label>
                          <textarea rows="5" value={draft.requirements} onChange={(e) => setDraft({ ...draft, requirements: e.target.value })} className="form-control" placeholder="Form IV Certificate&#10;Clean criminal record&#10;Valid driving licence" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div className="form-group">
                            <label>Attach PDF job document</label>
                            <input type="file" accept="application/pdf" onChange={handlePdfChange} className="form-control" />
                            {draft.pdfFileName && (
                              <div style={{ marginTop: '0.5rem', color: '#166534', fontSize: '0.9rem', fontWeight: '600' }}>
                                Attached: {draft.pdfFileName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="card" style={{ padding: '1rem', background: '#F8FAFC' }}>
                          <div style={{ fontWeight: '700', color: '#0A0B3D', marginBottom: '0.5rem' }}>Preview</div>
                          <div style={{ fontSize: '0.95rem', color: '#5A6072', lineHeight: '1.6' }}>
                            <strong>{draft.title || 'New vacancy title'}</strong><br />
                            {draft.location || 'Location'} • {draft.type}<br />
                            {draft.desc || 'Add a short description to preview the role.'}
                          </div>
                          <ul style={{ marginTop: '0.7rem', paddingLeft: '1rem', color: '#5A6072' }}>
                            {previewRequirements.map((item, index) => <li key={index}>{item}</li>)}
                          </ul>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                          <button type="submit" className="btn btn-navy" style={{ width: 'auto', justifyContent: 'center' }}>
                            <PlusCircle size={16} /> Publish vacancy
                          </button>
                          <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-outline-navy" style={{ width: 'auto' }}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <Briefcase size={18} className="text-navy" />
                  <h2 style={{ margin: 0, color: '#0A0B3D' }}>Current published vacancies</h2>
                </div>

                {jobs.length === 0 ? (
                  <div style={{ padding: '1rem', borderRadius: '10px', background: '#F8FAFC', color: '#5A6072' }}>
                    No vacancies published yet.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {jobs.map((job) => (
                      <div key={job.id} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', background: '#FFF' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'start' }}>
                          <div>
                            <div style={{ fontWeight: '800', color: '#0A0B3D', fontSize: '1.05rem' }}>{job.title}</div>
                            <div style={{ color: '#5A6072', marginTop: '0.25rem', fontSize: '0.92rem' }}>{job.location} • {job.type}</div>
                          </div>
                          <button onClick={() => handleDeleteJob(job.id)} className="btn btn-outline-navy" style={{ padding: '0.55rem 0.9rem' }}>
                            <Trash2 size={15} /> Remove
                          </button>
                        </div>
                        <p style={{ color: '#151821', lineHeight: '1.6', margin: '0.7rem 0' }}>{job.desc}</p>
                        {job.pdfFileName && (
                          <div style={{ marginBottom: '0.6rem', color: '#0A0B3D', fontWeight: '700', fontSize: '0.92rem' }}>
                            PDF attachment: {job.pdfFileName}
                          </div>
                        )}
                        {job.requirements?.length > 0 && (
                          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#5A6072', lineHeight: '1.6' }}>
                            {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
