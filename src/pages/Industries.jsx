import React from 'react';
import { Home, Building2, ShoppingBag, Factory, Zap, HardHat, Wheat, Truck, Hotel, GraduationCap, Stethoscope, Globe, Landmark, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { INDUSTRIES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function Industries({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in">
      <section style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(1.2rem, 3vw, 2rem)', alignItems: 'center' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Tailored Risk Management</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', color: '#FFF', fontFamily: 'Montserrat, sans-serif', marginBottom: '1rem' }}>
                Industries we protect with disciplined, site-specific security
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', lineHeight: '1.8', maxWidth: '720px' }}>
                Milano Security designs protective solutions around the operational realities of each sector, from critical infrastructure and logistics to residential estates and public institutions.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: 'clamp(1rem, 2vw, 1.4rem)', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#DCE4FF' }}>Professional coverage</div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>Sector-specific security programs</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.8rem' }}>
                {['Critical sites', 'Rapid response', 'Compliance-ready', '24/7 support'].map((item) => (
                  <div key={item} style={{ padding: '0.8rem 0.9rem', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '0.92rem' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1rem, 2.2vw, 1.5rem)' }}>
            {INDUSTRIES.map((ind, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.6rem' }}>
                <div>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(10,11,61,0.06)', color: '#0A0B3D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <ShieldCheck size={24} />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#0A0B3D', marginBottom: '0.6rem', fontFamily: 'Montserrat, sans-serif' }}>
                    {ind.title}
                  </h3>

                  <p style={{ color: '#5A6072', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                    {ind.desc}
                  </p>
                </div>

                <button 
                  onClick={() => setCurrentPage('quote')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0A0B3D',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: 0,
                    justifyContent: 'flex-start'
                  }}
                >
                  Request Consultation <ArrowRight size={16} color="#0A0B3D" />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', borderRadius: '18px', padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.2rem, 3vw, 2rem)', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: '#FFF', marginBottom: '0.8rem' }}>Need a solution for a specialized operation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '680px', margin: '0 auto 1.6rem auto', lineHeight: '1.7' }}>
              We develop custom security programs for complex environments, multi-site estates, and unique client requirements across Tanzania.
            </p>
            <button onClick={() => setCurrentPage('contact')} className="btn btn-gold">
              Contact Our Risk Assessment Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
