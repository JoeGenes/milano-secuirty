import React, { useState } from 'react';
import { Shield, CheckCircle2, ArrowRight, Sparkles, Building2, Camera, KeyRound, BellRing, Zap, Flame, Dog, Scan, Search, Clock, Car, GraduationCap, Award } from 'lucide-react';
import { SERVICES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Services({ setCurrentPage, lang }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const t = TRANSLATIONS[lang];

  const categories = ['All', 'Physical Security', 'Electronic Security', 'Perimeter Protection', 'Fire & Safety', 'Specialized Security', 'Screening Equipment', 'Accountability Tools'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  const categorySummary = {
    All: 'A complete portfolio of protective solutions for commercial, residential, industrial, and institutional environments.',
    'Physical Security': 'Professional guarding, patrols, and site-based protection staffed by trained personnel.',
    'Electronic Security': 'Modern surveillance, access control, alarm, and remote monitoring technologies.',
    'Perimeter Protection': 'Robust physical barriers and monitoring systems for secure property boundaries.',
    'Fire & Safety': 'Fire prevention, alarm systems, and staff fire-safety readiness services.',
    'Specialized Security': 'Highly tailored operations including K9 units and specialist deployments.',
    'Screening Equipment': 'Advanced screening tools for access control and security checkpoints.',
    'Accountability Tools': 'Operational systems that strengthen supervision, reporting, and guard accountability.'
  };

  return (
    <div className="animate-fade-in">
      <section style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge badge-navy" style={{ marginBottom: '1rem' }}>Comprehensive Protection Solutions</span>
              <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif', marginBottom: '1rem' }}>
                Professional security services tailored to your environment
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '700px' }}>
                Milano Security delivers integrated physical and electronic protection through trained personnel, modern technology, and disciplined operations across Tanzania.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.4rem' }}>
                <button onClick={() => setCurrentPage('quote')} className="btn btn-navy" style={{ borderRadius: '50px' }}>
                  Request a Quote <ArrowRight size={16} />
                </button>
                <button onClick={() => setCurrentPage('contact')} className="btn btn-outline-blue" style={{ borderRadius: '50px', borderColor: '#FFFFFF', color: '#FFFFFF', background: 'transparent' }}>
                  Contact Us
                </button>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#DCE4FF' }}>Current Focus</div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>{selectedCategory}</div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.94rem', lineHeight: '1.7' }}>
                {categorySummary[selectedCategory]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '2rem 0', backgroundColor: '#FFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.7rem 1.2rem',
                  borderRadius: '999px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: selectedCategory === cat ? '#0A0B3D' : '#CBD5E1',
                  backgroundColor: selectedCategory === cat ? '#0A0B3D' : '#FFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4.5rem 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
            {filteredServices.map(service => (
              <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(10,11,61,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Shield size={24} color="#0A0B3D" />
                    </div>
                    <span className="badge badge-navy">{service.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#0A0B3D', marginBottom: '0.7rem', fontFamily: 'Montserrat, sans-serif' }}>
                    {service.title}
                  </h3>

                  <p style={{ color: '#5A6072', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                    {service.fullDesc}
                  </p>

                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginBottom: '1.4rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0A0B3D', textTransform: 'uppercase', marginBottom: '0.7rem', letterSpacing: '0.5px' }}>
                      Key Features
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#151821' }}>
                      {service.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <CheckCircle2 size={16} className="text-navy" style={{ flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('quote')}
                  className="btn btn-navy"
                  style={{ width: '100%', fontSize: '0.9rem', justifyContent: 'center', borderRadius: '10px' }}
                >
                  Request Quote <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
