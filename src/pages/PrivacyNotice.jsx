import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function PrivacyNotice({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: '4rem 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>PDPC Reg. No. 0-000-010-187</span>
          <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Data Privacy Notice
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '800px', marginTop: '0.8rem', lineHeight: '1.6' }}>
            Prepared in accordance with the Personal Data Protection Act of Tanzania (PDPA) and Personal Data Protection Commission (PDPC) guidelines.
          </p>
        </div>
      </section>

      {/* Main Privacy Notice Document */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFF' }}>
        <div className="container">
          <div className="card" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: '#151821' }}>
            
            <div style={{ padding: '1.2rem', background: '#F8FAFC', borderRadius: '10px', marginBottom: '2rem', fontSize: '0.9rem' }}>
              <strong>Official Registered Legal Entity:</strong> {COMPANY_INFO.brelaName}<br />
              <strong>BRELA Incorporation No:</strong> {COMPANY_INFO.companyNumber}<br />
              <strong>Data Controller Registration:</strong> {COMPANY_INFO.pdpc} (Valid to {COMPANY_INFO.pdpcValidity})<br />
              <strong>Official DPO Email:</strong> {COMPANY_INFO.dpoEmail}
            </div>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
              1. Information We Collect
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#5A6072', marginBottom: '1rem' }}>
              Milano Security Service Limited collects personal data directly from visitors, clients, job applicants, and service inquiries. This includes:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: '#5A6072', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              <li>Contact details: Full names, telephone numbers, postal and email addresses.</li>
              <li>Premises security data: Facility location, risk assessment details, access control logs, and CCTV video footage in protected areas.</li>
              <li>Recruitment information: CVs, educational history, background check consent, and contact records.</li>
            </ul>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
              2. Purpose and Legal Basis for Processing
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#5A6072', marginBottom: '1rem' }}>
              We process personal data strictly under lawful bases specified by Tanzanian law:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: '#5A6072', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              <li><strong>Performance of Contract:</strong> Delivering agreed guarding, patrol, CCTV monitoring, and alarm response services.</li>
              <li><strong>Legal Obligation:</strong> Complying with TRA tax filings, NSSF, WCF, and police reporting mandates.</li>
              <li><strong>Legitimate Interest:</strong> Protecting life, physical property, and public safety on customer premises.</li>
            </ul>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
              3. Data Retention & Security Measures
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#5A6072', marginBottom: '1.5rem' }}>
              We implement strict technical and organizational safeguards including encrypted data transmission, restricted access controls, and routine security audits. Personal data is retained only for as long as necessary to fulfill service contracts or statutory retention periods under Tanzanian law.
            </p>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.8rem' }}>
              4. Data Subject Rights & DPO Contact
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#5A6072', marginBottom: '1rem' }}>
              Under the Tanzanian Data Protection Act, you have the right to request access to, correction of, or deletion of your personal data held by Milano Security Service Limited.
            </p>
            <div style={{ background: '#F3F5F7', padding: '1.2rem', borderRadius: '8px', fontSize: '0.9rem' }}>
              <strong>Data Protection Officer (DPO):</strong><br />
              Milano Security Service Limited<br />
              Hazina Ward, Kinyambwa Road, Dodoma, Tanzania<br />
              Email: {COMPANY_INFO.dpoEmail} | Tel: {COMPANY_INFO.telephones[0]}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
