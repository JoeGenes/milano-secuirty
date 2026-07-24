import React from 'react';
import { Building2, ShieldCheck, CheckCircle2, ArrowRight, FileText } from 'lucide-react';
import { CLIENT_LOGOS, CASE_STUDIES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function CaseStudies({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: '4rem 0', borderBottom: '3px solid #E7AD18' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Proven Security Outcomes</span>
          <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif' }}>
            Clients & Case Studies
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '800px', marginTop: '0.8rem', lineHeight: '1.6' }}>
            Discover how Milano Security Service Limited delivers measurable protection for commercial complexes, industrial plants, and agricultural estates across Tanzania.
          </p>
        </div>
      </section>

      {/* Case Studies Section */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-navy" style={{ marginBottom: '0.6rem' }}>Field Success Stories</span>
            <h2 style={{ fontSize: '2rem', color: '#0A0B3D' }}>Featured Security Implementations</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {CASE_STUDIES.map(cs => (
              <div key={cs.id} className="card" style={{ padding: '2.5rem', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0A0B3D', margin: 0 }}>{cs.client}</h3>
                  <span className="badge badge-navy">{cs.industry}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem', marginTop: '1.5rem' }}>
                  <div style={{ background: '#FFF', padding: '1.2rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 'bold', color: '#9B0058', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                      1. Security Challenge:
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#5A6072', lineHeight: '1.6' }}>{cs.challenge}</p>
                  </div>

                  <div style={{ background: '#FFF', padding: '1.2rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 'bold', color: '#0A0B3D', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                      2. Milano's Integrated Solution:
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#5A6072', lineHeight: '1.6' }}>{cs.solution}</p>
                  </div>

                  <div style={{ background: '#FFF', padding: '1.2rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 'bold', color: '#B58308', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                      3. Results & Impact:
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#5A6072', lineHeight: '1.6' }}>{cs.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Grid */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>Client References</span>
            <h2 style={{ fontSize: '2rem', color: '#0A0B3D' }}>Approved Corporate Client References</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {CLIENT_LOGOS.map((client, idx) => (
              <div key={idx} className="card" style={{ textAlign: 'center', padding: '2rem 1.2rem' }}>
                <Building2 size={32} color="#0A0B3D" style={{ marginBottom: '0.8rem' }} />
                <h4 style={{ fontSize: '1.05rem', color: '#0A0B3D', marginBottom: '0.3rem' }}>{client.name}</h4>
                <span style={{ fontSize: '0.78rem', color: '#5A6072' }}>{client.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
