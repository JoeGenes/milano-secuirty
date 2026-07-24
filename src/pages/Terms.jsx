import React from 'react';
import { FileText, Shield, Scale } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Terms({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: '4rem 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Legal Agreement</span>
          <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Website Terms & Conditions
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '800px', marginTop: '0.8rem', lineHeight: '1.6' }}>
            Governing the use of Milano Security Service Limited official digital platforms, quotation requests, and client communication.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFF' }}>
        <div className="container">
          <div className="card" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: '#151821' }}>
            
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.88rem' }}>
              <strong>Official Registered Name:</strong> {COMPANY_INFO.brelaName}<br />
              <strong>Governing Law:</strong> Laws of the United Republic of Tanzania<br />
              <strong>Jurisdiction:</strong> High Court of Tanzania / Dodoma Resident Magistrate Court
            </div>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              1. Permitted Use & Ownership
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              All text, trademarks, brand logos, service descriptions, and layout design on this website are the intellectual property of Milano Security Service Limited. Unauthorized copying, reproduction, or fraudulent misrepresentation of company credentials is strictly prohibited.
            </p>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              2. Quotation Estimates & Contractual Limitations
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Quotations generated through this website are preliminary cost estimates. Final service pricing and operational binding contracts are subject to an approved physical site risk assessment and a executed written security service contract signed by authorized company executives.
            </p>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              3. Service Availability & Operational Regions
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              While Milano Security Service Limited provides coverage across 12 regions of Tanzania, specific response times and electronic equipment availability are subject to site-specific verification during assessment.
            </p>

            <h2 style={{ color: '#0A0B3D', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
              4. Governing Law & Dispute Resolution
            </h2>
            <p style={{ color: '#5A6072', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              These terms are governed by and construed in accordance with the Laws of the United Republic of Tanzania. Any formal legal disputes shall be handled through the competent courts of Dodoma, Tanzania.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
