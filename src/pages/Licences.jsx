import React from 'react';
import { ShieldCheck, Lock, AlertCircle, FileCheck, Download } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Licences({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  const credentialsList = [
    {
      title: "BRELA Certificate of Incorporation",
      number: "Company No. 154815619",
      date: "Incorporated 21 January 2022",
      authority: "Business Registrations and Licensing Agency (BRELA), Tanzania",
      status: "Verified & Active"
    },
    {
      title: "Police Authorisation",
      number: "Private Security Approval",
      date: "Dated 18 January 2022",
      authority: "Tanzania Police Force Headquarters",
      status: "Verified & Active"
    },
    {
      title: "Dodoma Business Licence",
      number: "Dodoma City Council Licence",
      date: "Issued 25 Feb 2026 | Expires 24 Feb 2027",
      authority: "Dodoma City Council Licensing Authority",
      status: "Current & Valid"
    },
    {
      title: "Taxpayer Identification Number (TIN)",
      number: "TIN: 154-815-619",
      date: "Registered Taxpayer Status",
      authority: "Tanzania Revenue Authority (TRA)",
      status: "Compliant"
    },
    {
      title: "VAT Registration Certificate",
      number: "VRN: 40-324475-H",
      date: "Effective 2 December 2025",
      authority: "Tanzania Revenue Authority (TRA)",
      status: "Active VRN"
    },
    {
      title: "PDPC Data Controller Registration",
      number: "Reg No. 0-000-010-187",
      date: "Valid to 20 May 2031",
      authority: "Personal Data Protection Commission (PDPC), Tanzania",
      status: "Registered Data Controller"
    },
    {
      title: "NSSF Employer Registration",
      number: "Employer Reg No. 1045350",
      date: "Social Security Compliance",
      authority: "National Social Security Fund (NSSF)",
      status: "Compliant"
    },
    {
      title: "Workers Compensation Fund (WCF)",
      number: "Employer Reg No. 042953",
      date: "Workplace Injury Protection",
      authority: "Workers Compensation Fund (WCF), Tanzania",
      status: "Compliant"
    }
  ];

  return (
    <div className="animate-fade-in">
      <section style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(1.2rem, 3vw, 2rem)', alignItems: 'center' }}>
            <div>
              <span className="badge badge-navy" style={{ marginBottom: '1rem' }}>Statutory & Legal Credentials</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', color: '#FFF', fontFamily: 'Montserrat, sans-serif', marginBottom: '1rem' }}>
                Licences, registrations and certifications held by Milano Security
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', lineHeight: '1.8', maxWidth: '720px' }}>
                Milano Security maintains compliance across registration, licensing, tax administration, police authorization, and data-protection requirements in Tanzania.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: '1.3rem', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#DCE4FF' }}>Verified compliance</div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>Management-approved credential summary</div>
                </div>
              </div>
              <div style={{ padding: '0.9rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '0.94rem', lineHeight: '1.7' }}>
                Full certificates are reviewed internally and shared only in approved formats to protect security-sensitive information and maintain confidentiality.
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
              <strong>Management verification policy:</strong> Only approved credential summaries are published online. Sensitive certificate details are redacted before publication.
            </span>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1rem, 2.2vw, 1.5rem)' }}>
            {credentialsList.map((cred, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.6rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(10,11,61,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileCheck size={22} color="#0A0B3D" />
                    </div>
                    <span className="badge badge-navy">{cred.status}</span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', color: '#0A0B3D', marginBottom: '0.6rem', fontFamily: 'Montserrat, sans-serif' }}>
                    {cred.title}
                  </h3>

                  <div style={{ background: '#F8FAFC', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', color: '#0A0B3D', marginBottom: '0.8rem' }}>
                    {cred.number}
                  </div>

                  <div style={{ fontSize: '0.88rem', color: '#5A6072', lineHeight: '1.6' }}>
                    <div style={{ marginBottom: '0.4rem' }}><strong>Authority:</strong> {cred.authority}</div>
                    <div><strong>Details:</strong> {cred.date}</div>
                  </div>
                </div>

                <div style={{ marginTop: '1.3rem', borderTop: '1px solid #E2E8F0', paddingTop: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#475569' }}>
                  <Lock size={13} /> Official summary verified by Milano compliance
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <button 
              onClick={() => alert("Simulated PDF Download: Milano Security Official Profile & Credential Summary PDF will download automatically.")} 
              className="btn btn-navy"
            >
              <Download size={18} /> Download Verified Credential Brief (PDF)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
