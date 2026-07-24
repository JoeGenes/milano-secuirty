import React from 'react';
import { Shield, CheckCircle2, History, Eye, Target, Building2, Phone, Compass, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function About({ setCurrentPage, lang }) {
  const t = TRANSLATIONS[lang];

  const highlights = [
    { title: 'Founded', value: 'Jan 2022', desc: 'Incorporated under the Companies Act, 2002.' },
    { title: 'Coverage', value: '12 regions', desc: 'Operational reach across Tanzania.' },
    { title: 'Response', value: '24/7', desc: 'Immediate coordination and field support.' }
  ];

  return (
    <div className="animate-fade-in">
      <section style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(1.5rem, 3vw, 2.5rem)', alignItems: 'center' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>Corporate Profile</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#FFF', fontFamily: 'Montserrat, sans-serif', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                About Milano Security Service Limited
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', lineHeight: '1.8', maxWidth: '700px' }}>
                A wholly Tanzanian-owned security provider delivering trusted guarding, electronic surveillance, and integrated protection solutions for homes, businesses, institutions, and critical facilities.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.5rem, 2vw, 1rem)', marginTop: 'clamp(0.8rem, 2vw, 1.6rem)' }}>
                <button onClick={() => setCurrentPage('contact')} className="btn btn-navy" style={{ borderRadius: '50px' }}>
                  Contact Our Team <ArrowRight size={16} />
                </button>
                <button onClick={() => setCurrentPage('services')} className="btn btn-outline-blue" style={{ borderRadius: '50px', borderColor: '#FFFFFF', color: '#FFFFFF', background: 'transparent' }}>
                  Explore Services
                </button>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '18px', padding: 'clamp(0.8rem, 2vw, 1.4rem)' }}>
              <div style={{ display: 'grid', gap: 'clamp(0.6rem, 1.5vw, 0.9rem)' }}>
                {highlights.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: 'clamp(0.7rem, 1.5vw, 1rem) clamp(0.8rem, 1.5vw, 1.1rem)' }}>
                    <div style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#DCE4FF', marginBottom: '0.35rem' }}>{item.title}</div>
                    <div style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.2rem' }}>{item.value}</div>
                    <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', color: 'rgba(255,255,255,0.8)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#FFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(1.2rem, 2vw, 2rem)', alignItems: 'start' }}>
            <div className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 2.2rem)', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.6rem, 1.5vw, 0.9rem)', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0A0B3D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: '#0A0B3D', margin: 0 }}>Company Background</h2>
                  <span style={{ color: '#64748B', fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}>Trusted delivery from day one</span>
                </div>
              </div>
              <p style={{ color: '#475569', fontSize: 'clamp(0.85rem, 1.5vw, 0.98rem)', lineHeight: '1.8', marginBottom: 'clamp(0.8rem, 2vw, 1.3rem)' }}>
                {COMPANY_INFO.profileText}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'clamp(0.8rem, 1.5vw, 1rem)' }}>
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: 'clamp(0.7rem, 1.5vw, 1rem)', border: '1px solid #E2E8F0' }}>
                  <Building2 size={18} color="#0A0B3D" style={{ marginBottom: '0.4rem' }} />
                  <div style={{ fontWeight: '700', color: '#0A0B3D', marginBottom: '0.2rem', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>Headquarters</div>
                  <div style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)', color: '#64748B' }}>Dodoma, Tanzania</div>
                </div>
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: 'clamp(0.7rem, 1.5vw, 1rem)', border: '1px solid #E2E8F0' }}>
                  <Phone size={18} color="#0A0B3D" style={{ marginBottom: '0.4rem' }} />
                  <div style={{ fontWeight: '700', color: '#0A0B3D', marginBottom: '0.2rem', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>Contact</div>
                  <div style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)', color: '#64748B' }}>{COMPANY_INFO.telephones[0]}</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 2.2rem)', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1.2vw, 0.8rem)', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(10,11,61,0.1)', color: '#0A0B3D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Compass size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: '#0A0B3D', margin: 0 }}>Why Clients Choose Us</h3>
                  <span style={{ color: '#64748B', fontSize: 'clamp(0.7rem, 1.4vw, 0.82rem)' }}>Professional, responsive, and technology-led</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.2vw, 0.85rem)' }}>
                {[
                  'Highly trained security personnel with strict supervision.',
                  'Integrated physical and electronic security solutions.',
                  'Site-specific risk analysis and rapid response planning.',
                  'Long-term service support for commercial, industrial, and residential clients.'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.5rem, 1vw, 0.7rem)', background: '#F8FAFC', borderRadius: '10px', padding: 'clamp(0.6rem, 1.2vw, 0.9rem) clamp(0.7rem, 1.5vw, 1rem)' }}>
                    <CheckCircle2 size={18} color="#0A0B3D" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span style={{ color: '#475569', fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)', lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto clamp(1.5rem, 3vw, 3rem) auto' }}>
            <span className="badge badge-navy" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.7rem)' }}>Our Purpose</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.1rem)', color: '#0A0B3D' }}>Built around trust, accountability, and operational excellence</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(1rem, 2vw, 1.4rem)' }}>
            <div className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 2rem)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(10,11,61,0.08)', color: '#0A0B3D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto clamp(0.6rem, 1.5vw, 1rem) auto' }}>
                <Eye size={26} />
              </div>
              <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: '#0A0B3D', marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)' }}>Our Vision</h3>
              <p style={{ color: '#64748B', fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)', lineHeight: '1.7' }}>
                {COMPANY_INFO.vision}
              </p>
            </div>

            <div className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 2rem)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(10,11,61,0.08)', color: '#0A0B3D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto clamp(0.6rem, 1.5vw, 1rem) auto' }}>
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: '#0A0B3D', marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)' }}>Our Mission</h3>
              <p style={{ color: '#64748B', fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)', lineHeight: '1.7' }}>
                {COMPANY_INFO.mission}
              </p>
            </div>

            <div className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 2rem)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(10,11,61,0.08)', color: '#0A0B3D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto clamp(0.6rem, 1.5vw, 1rem) auto' }}>
                <History size={26} />
              </div>
              <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: '#0A0B3D', marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)' }}>Our Journey</h3>
              <p style={{ color: '#64748B', fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)', lineHeight: '1.7' }}>
                From our early operations in Bariadi to our present presence across 12 regions, we have steadily grown with discipline and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0', backgroundColor: '#0A0B3D', color: '#FFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto clamp(1.5rem, 3vw, 3rem) auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: 'clamp(0.6rem, 1vw, 0.8rem)' }}>Guiding Principles</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: '#FFF' }}>Core values that define our service culture</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 'clamp(0.3rem, 0.8vw, 0.5rem)', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', lineHeight: '1.7' }}>
              The standards that shape our personnel conduct, client communication, and operational delivery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(1rem, 2vw, 1.3rem)' }}>
            {COMPANY_INFO.coreValues.map((val, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: 'clamp(0.9rem, 1.8vw, 1.3rem)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 'clamp(0.85rem, 1.6vw, 1rem)', marginBottom: 'clamp(0.4rem, 0.8vw, 0.55rem)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={17} color="#DCE4FF" /> {val.title}
                </div>
                <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
