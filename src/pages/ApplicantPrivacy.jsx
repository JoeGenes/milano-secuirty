import React from 'react';
import { UserCheck, Shield, Lock, FileCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function ApplicantPrivacy({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: '4rem 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Recruitment Data Protection</span>
          <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Applicant Privacy Notice
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '800px', marginTop: '0.8rem', lineHeight: '1.6' }}>
            Specific privacy disclosures explaining how recruitment data, background checks, and applicant CVs are securely handled by Milano Security HR Department.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFF' }}>
        <div className="container">
          <div className="card" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: '#151821' }}>
            
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.88rem' }}>
              <strong>Recruitment Data Controller:</strong> Milano Security Service Limited HR Department<br />
              <strong>Primary Purpose:</strong> Candidate vetting, physical fitness assessment, and employment background verification.
            </div>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              1. Information Collected During Application
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1rem' }}>
              When you submit an application through our Careers portal, we collect:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: '#5A6072', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              <li>Full legal name, phone number, email address, and region of residence.</li>
              <li>Educational certificates (Form IV, Form VI, VETA, Diploma) and work history.</li>
              <li>Attached Curriculum Vitae (CV) and cover messages.</li>
            </ul>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              2. Candidate Vetting & Background Checks
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Due to the sensitive nature of security services, Milano Security conducts background checks, including criminal record verifications and reference checks with past employers or local ward authorities. By submitting an application, you consent to these authorized verification procedures.
            </p>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              3. Persons Authorized to Access Applications
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Access to applicant files is strictly restricted to authorized HR personnel and senior security operational managers. Applicant data is never sold, shared, or transferred to third-party commercial entities.
            </p>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              4. Data Retention Period & Withdrawal
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Unsuccessful applicant files are retained in our secure recruitment database for up to 12 months for future vacancy consideration, after which they are securely deleted. Applicants may request immediate removal of their CV by emailing <strong>{COMPANY_INFO.emails[0]}</strong>.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
