import React, { useState } from 'react';
import { Shield, Phone, MessageSquare, ArrowRight, CheckCircle2, MapPin, Building2, UserCheck, Lock, Award, Users, Camera, BellRing, Dog, Car, HardHat, Flame, Scan, Star, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, SERVICES, COVERAGE_REGIONS, CLIENT_LOGOS, CASE_STUDIES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import heroImage from '/police.jpeg';

export default function Home({ setCurrentPage, lang }) {
  const [activeTab, setActiveTab] = useState('manned');
  const t = TRANSLATIONS[lang];

  const serviceTabDetails = {
    manned: {
      title: "Manned Guarding Services",
      desc: "We provide vetted, highly trained, and disciplined security officers to secure residential, commercial, industrial, and institutional premises across Tanzania.",
      points: [
        "Rigorous background checks & Police clearance",
        "24/7 Supervisor monitoring & emergency support",
        "Tailored site security protocols & visitor logs"
      ],
      tag: "Physical Protection"
    },
    cctv: {
      title: "CCTV & Electronic Surveillance",
      desc: "Full site risk assessment, supply, installation, cloud configuration, and maintenance of high-definition CCTV camera systems with remote mobile monitoring.",
      points: [
        "Night-vision HD AI motion detection",
        "Remote viewing on Smartphone & Desktop",
        "System maintenance & cloud NVR storage"
      ],
      tag: "Electronic Security"
    },
    fencing: {
      title: "Electric Fencing & Alarm Systems",
      desc: "Heavy-duty multi-strand perimeter electric fences integrated with GSM alert systems and loud audio-visual alarm sirens.",
      points: [
        "High-tensile wire perimeter barrier",
        "Instant SMS/Call alerts on fence tampering",
        "Solar & heavy-duty battery backup"
      ],
      tag: "Perimeter Protection"
    },
    k9: {
      title: "K9 Security & Dog Handlers",
      desc: "Specially trained security dogs (German Shepherd & Belgian Malinois) with certified handlers for high-security perimeter patrols and industrial sites.",
      points: [
        "Certified professional dog handlers",
        "Perimeter night patrol & intrusion deterrence",
        "Routine health checks & obedience training"
      ],
      tag: "Specialized Guarding"
    }
  };

  const currentTab = serviceTabDetails[activeTab];

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: HERO BANNER (Deep Navy Blue #0A0B3D Accents)       */}
      {/* ------------------------------------------------------------- */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(2rem, 5vw, 4rem) 0 clamp(2.5rem, 6vw, 5rem) 0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="home-hero-grid">
            
            {/* Left Hero Content */}
            <div className="home-hero-content">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10, 11, 61, 0.06)', color: '#0A0B3D', padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 1.5vw, 0.9rem)', borderRadius: '50px', fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)', fontWeight: '700', marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)', border: '1px solid rgba(10, 11, 61, 0.15)' }}>
                <Shield size={16} /> BRELA Reg #154815619 &bull; Tanzania
              </div>

              <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: '#0A0B3D', lineHeight: '1.15', marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)', fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }}>
                Top-Rated Security Company in Tanzania: <span style={{ color: '#D4AF37' }}>Affordable, Reliable & Trusted</span>
              </h1>

              <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: '#475569', lineHeight: '1.7', marginBottom: 'clamp(1.2rem, 3vw, 2rem)', maxWidth: '600px' }}>
                Ensuring Peace of Mind: Your Trusted Partner for Professional Guarding, CCTV, Access Control, Electric Fencing, and K9 Security Services in Dodoma & Across Tanzania.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.5rem, 2vw, 1rem)', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                <button onClick={() => setCurrentPage('quote')} className="btn btn-navy" style={{ borderRadius: '50px', padding: 'clamp(0.65rem, 1.5vw, 0.95rem) clamp(1.2rem, 3vw, 2.2rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', backgroundColor: '#0A0B3D' }}>
                  REQUEST A QUOTE <ArrowUpRight size={18} />
                </button>
                
                <a href={`tel:${COMPANY_INFO.telephones[0]}`} className="btn btn-outline-blue" style={{ borderRadius: '50px', padding: 'clamp(0.65rem, 1.5vw, 0.95rem) clamp(1rem, 2.5vw, 1.8rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', borderColor: '#0A0B3D', color: '#0A0B3D' }}>
                  <Phone size={16} /> CALL NOW
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: 'clamp(0.8rem, 2vw, 1.8rem)', fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)', color: '#64748B', borderTop: '1px solid #E2E8F0', paddingTop: 'clamp(0.8rem, 2vw, 1.2rem)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#0A0B3D' }} />
                  <span>Fully Vetted Guards</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#0A0B3D' }} />
                  <span>24/7 Control Room</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#0A0B3D' }} />
                  <span>PDPC Certified</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="home-hero-visual" style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: 'clamp(1.5rem, 3vw, 0rem)', width: '100%' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                padding: '0.55rem',
                background: 'linear-gradient(135deg, rgba(10, 11, 61, 0.10), rgba(212, 175, 55, 0.12))',
                boxShadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
                border: '1px solid rgba(10, 11, 61, 0.06)'
              }}>
                <img
                  src={heroImage}
                  alt="Milano Security team and security operations"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: '0.55rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'linear-gradient(180deg, rgba(10,11,61,0.08) 0%, rgba(10,11,61,0.45) 100%)',
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  textAlign: 'left',
                  color: '#FFFFFF',
                  background: 'rgba(10, 11, 61, 0.72)',
                  padding: 'clamp(0.5rem, 1.5vw, 0.7rem) clamp(0.6rem, 1.5vw, 0.9rem)',
                  borderRadius: '999px',
                  backdropFilter: 'blur(6px)',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.18)'
                }}>
                  <div style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.9 }}>
                    Security That Protects
                  </div>
                  <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', fontWeight: 700, marginTop: '0.15rem' }}>
                    Peace of Mind Daily
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  color: '#FFFFFF',
                  background: 'rgba(212, 175, 55, 0.92)',
                  padding: 'clamp(0.5rem, 1.5vw, 0.7rem) clamp(0.6rem, 1.5vw, 0.9rem)',
                  borderRadius: '999px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
                }}>
                  24/7 Protection
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: WELCOME SECTION                                   */}
      {/* ------------------------------------------------------------- */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 5.5rem) 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="welcome-section-grid">
            
            {/* Left 3 Card Layout */}
            <div className="welcome-cards-grid">
              <div className="card" style={{ padding: 'clamp(1rem, 2.5vw, 1.8rem)', background: '#FFFFFF', textAlign: 'center' }}>
                <UserCheck size={36} color="#0A0B3D" style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }} />
                <h4 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#0A0B3D', marginBottom: '0.3rem' }}>Vetted Guards</h4>
                <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)', color: '#64748B' }}>Background checks & police clearance</p>
              </div>

              <div className="card" style={{ padding: 'clamp(1rem, 2.5vw, 1.8rem)', background: '#FFFFFF', textAlign: 'center' }}>
                <Camera size={36} color="#0A0B3D" style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }} />
                <h4 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#0A0B3D', marginBottom: '0.3rem' }}>CCTV Systems</h4>
                <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)', color: '#64748B' }}>HD mobile remote viewing</p>
              </div>

              <div className="card" style={{ padding: 'clamp(1rem, 2.5vw, 1.8rem)', background: '#FFFFFF', textAlign: 'center', gridColumn: 'span 2' }}>
                <Dog size={36} color="#0A0B3D" style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }} />
                <h4 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#0A0B3D', marginBottom: '0.3rem' }}>K9 Patrol & Fencing</h4>
                <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)', color: '#64748B' }}>Specialized dog handlers & high-voltage energizers</p>
              </div>
            </div>

            {/* Right Welcome Description */}
            <div className="welcome-content">
              <span className="section-subtitle" style={{ color: '#0A0B3D' }}>WELCOME TO MILANO SECURITY</span>
              <h2 className="section-title" style={{ color: '#0A0B3D', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>
                Professional Security Services Built on Trust & Excellence
              </h2>

              <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#475569', lineHeight: '1.7', marginBottom: 'clamp(1rem, 2.5vw, 1.8rem)' }}>
                At Milano Security Service Limited, we offer a comprehensive range of site-inspected protection services to shield residential properties, corporate headquarters, industrial parks, and public sector organizations across Tanzania.
              </p>

              <h4 style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: '#0A0B3D', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)', fontFamily: 'Montserrat, sans-serif' }}>Our Proposed Core Values:</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vw, 0.8rem)', marginBottom: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
                {[
                  "Integrity & Confidentiality in all operations",
                  "Vigilance & Preparedness 24 hours a day",
                  "Reliability & Accountability to fulfill agreed client SLAs",
                  "Continuous Training for Guards & Technical Personnel"
                ].map((val, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 1vw, 0.6rem)', fontSize: 'clamp(0.8rem, 1.8vw, 0.92rem)', color: '#0A0B3D', fontWeight: '600' }}>
                    <CheckCircle2 size={18} style={{ color: '#0A0B3D', flexShrink: 0 }} />
                    <span>{val}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setCurrentPage('about')} className="btn btn-navy" style={{ borderRadius: '50px', backgroundColor: '#0A0B3D', padding: 'clamp(0.6rem, 1.5vw, 0.85rem) clamp(1rem, 2.5vw, 1.8rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>
                KNOW MORE ABOUT US <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: FEATURED SERVICES (4 Circular Icon Cards)        */}
      {/* ------------------------------------------------------------- */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 5.5rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto clamp(1.5rem, 3vw, 3.5rem) auto' }}>
            <span className="section-subtitle" style={{ color: '#0A0B3D' }}>FEATURED SERVICES</span>
            <h2 className="section-title" style={{ color: '#0A0B3D', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Customized Exceptional Security Solutions</h2>
            <p style={{ color: '#64748B', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>Tailored to your property's specific risks and operational requirements.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(1rem, 2vw, 2rem)' }}>
            
            {/* Card 1: Manned Guarding */}
            <div className="card" style={{ textAlign: 'center', padding: 'clamp(1.2rem, 2.5vw, 2.5rem) clamp(0.8rem, 2vw, 1.5rem)' }}>
              <div className="circle-icon-box" style={{ background: 'rgba(10, 11, 61, 0.06)', color: '#0A0B3D', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                <Shield size={32} />
              </div>
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#0A0B3D', marginBottom: 'clamp(0.4rem, 1vw, 0.8rem)' }}>Security Guarding</h3>
              <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)', color: '#64748B', lineHeight: '1.6' }}>
                Professional uniformed security guards for residential, commercial & industrial premises.
              </p>
            </div>

            {/* Card 2: Mobile Patrol */}
            <div className="card" style={{ textAlign: 'center', padding: 'clamp(1.2rem, 2.5vw, 2.5rem) clamp(0.8rem, 2vw, 1.5rem)' }}>
              <div className="circle-icon-box" style={{ background: '#FEF3C7', color: '#B59227', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                <Car size={32} />
              </div>
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#0A0B3D', marginBottom: 'clamp(0.4rem, 1vw, 0.8rem)' }}>Mobile Patrol</h3>
              <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)', color: '#64748B', lineHeight: '1.6' }}>
                Scheduled inspections and emergency response using branded patrol vehicles.
              </p>
            </div>

            {/* Card 3: CCTV & Alarms */}
            <div className="card" style={{ textAlign: 'center', padding: 'clamp(1.2rem, 2.5vw, 2.5rem) clamp(0.8rem, 2vw, 1.5rem)' }}>
              <div className="circle-icon-box" style={{ background: 'rgba(10, 11, 61, 0.06)', color: '#0A0B3D', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                <Camera size={32} />
              </div>
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#0A0B3D', marginBottom: 'clamp(0.4rem, 1vw, 0.8rem)' }}>CCTV & Alarms</h3>
              <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)', color: '#64748B', lineHeight: '1.6' }}>
                AI motion detection, remote smartphone viewing, and GSM intruder alarms.
              </p>
            </div>

            {/* Card 4: K9 Services */}
            <div className="card" style={{ textAlign: 'center', padding: 'clamp(1.2rem, 2.5vw, 2.5rem) clamp(0.8rem, 2vw, 1.5rem)' }}>
              <div className="circle-icon-box" style={{ background: 'rgba(10, 11, 61, 0.06)', color: '#0A0B3D', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                <Dog size={32} />
              </div>
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#0A0B3D', marginBottom: 'clamp(0.4rem, 1vw, 0.8rem)' }}>K9 Patrol Units</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: '1.6' }}>
                Trained security dogs with certified handlers for perimeter night security.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: DEEP NAVY BLUE CTA BANNER (#0A0B3D)                */}
      {/* ------------------------------------------------------------- */}
      <section className="cta-banner-blue" style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #16185E 100%)' }}>
        <div className="container">
          <div className="cta-banner-row">
            <div className="cta-banner-copy">
              <span style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800', color: '#0A0B3D' }}>
                SECURITY FOR ALL
              </span>
              <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', color: '#FFFFFF', marginTop: '0.4rem', fontFamily: 'Montserrat, sans-serif', lineHeight: '1.3' }}>
                Our technology-driven security solutions enhance safety and peace of mind.
              </h2>
            </div>

            <button onClick={() => setCurrentPage('contact')} className="btn cta-banner-button" style={{ background: '#D4AF37', color: '#0A0B3D', borderRadius: '50px', padding: 'clamp(0.6rem, 1.5vw, 0.9rem) clamp(1.2rem, 2.5vw, 2.2rem)', fontWeight: 'bold', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', whiteSpace: 'nowrap' }}>
              LET'S TALK <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: INTERACTIVE SERVICES SHOWCASE TABS                */}
      {/* ------------------------------------------------------------- */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 5.5rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto clamp(1.5rem, 3vw, 3rem) auto' }}>
            <span className="section-subtitle" style={{ color: '#0A0B3D' }}>SERVICES RANGE</span>
            <h2 className="section-title" style={{ color: '#0A0B3D', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Give us a chance to make secure you!</h2>
          </div>

          {/* Service Tab Pills */}
          <div className="service-tabs-row">
            {[
              { id: 'manned', label: 'Manned Guarding' },
              { id: 'cctv', label: 'CCTV Surveillance' },
              { id: 'fencing', label: 'Electric Fencing & Alarms' },
              { id: 'k9', label: 'K9 Security & Handlers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.8rem, 1.5vw, 1.5rem)',
                  borderRadius: '50px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '700',
                  fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: activeTab === tab.id ? '#0A0B3D' : '#E2E8F0',
                  backgroundColor: activeTab === tab.id ? '#0A0B3D' : '#FFFFFF',
                  color: activeTab === tab.id ? '#FFFFFF' : '#0A0B3D',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="card services-showcase-card" style={{ padding: 'clamp(1.5rem, 2.5vw, 3rem)', background: '#F8FAFC' }}>
            <div className="services-showcase-grid">
              <div>
                <span className="badge badge-gold" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)' }}>{currentTab.tag}</span>
                <h3 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', color: '#0A0B3D', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)', fontFamily: 'Montserrat, sans-serif' }}>
                  {currentTab.title}
                </h3>
                <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: '#475569', lineHeight: '1.7', marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)' }}>
                  {currentTab.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.2vw, 0.8rem)', marginBottom: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
                  {currentTab.points.map((pt, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.4rem, 1vw, 0.6rem)', fontSize: 'clamp(0.8rem, 1.6vw, 0.92rem)', color: '#0A0B3D', fontWeight: '600' }}>
                      <CheckCircle2 size={18} style={{ color: '#0A0B3D', flexShrink: 0, marginTop: '0.1rem' }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setCurrentPage('quote')} className="btn btn-navy" style={{ borderRadius: '50px', backgroundColor: '#0A0B3D', padding: 'clamp(0.6rem, 1.5vw, 0.85rem) clamp(1rem, 2.5vw, 1.8rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>
                  REQUEST A QUOTE <ArrowRight size={16} />
                </button>
              </div>

              <div style={{ background: '#FFFFFF', padding: 'clamp(1.2rem, 2.5vw, 2.5rem)', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', width: '100%' }}>
                <Shield size={64} color="#0A0B3D" style={{ marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)' }} />
                <h4 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#0A0B3D', marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>Tanzania Statutory Approval</h4>
                <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.88rem)', color: '#64748B', lineHeight: '1.6' }}>
                  BRELA Reg No. 154815619 &bull; Police Authorisation Dated 18 Jan 2022 &bull; PDPC Data Controller Registration No. 0-000-010-187
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: INDUSTRIES (8 Template Cards)                     */}
      {/* ------------------------------------------------------------- */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 5.5rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto clamp(1.5rem, 3vw, 3.5rem) auto' }}>
            <span className="section-subtitle" style={{ color: '#0A0B3D' }}>WHO WE ARE SERVING</span>
            <h2 className="section-title" style={{ color: '#0A0B3D', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Guardians of Prestigious Places: Our Trusted Legacy</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(1rem, 2vw, 1.8rem)' }}>
            {[
              { title: "Metropolitan Areas", desc: "City center commercial offices & high-density property guarding.", icon: Building2 },
              { title: "Residential Communities", desc: "Private estate gates, perimeter fences, and visitor management.", icon: Shield },
              { title: "Industrial Facilities", desc: "Factories, scale protection, K9 patrols, and warehouse loss prevention.", icon: HardHat },
              { title: "Educational Institutions", desc: "School campus perimeter security and student access control.", icon: Users },
              { title: "Healthcare Facilities", desc: "Hospital entrance security, triage area order, and asset safety.", icon: Shield },
              { title: "Shopping Centers", desc: "Retail store loss prevention, CCTV surveillance, and crowd control.", icon: Building2 },
              { title: "Infrastructure & Energy", desc: "Critical facility guarding, solar parks, and remote site protection.", icon: Shield },
              { title: "Agribusiness Estates", desc: "Large perimeter estate patrols, K9 teams, crop & livestock protection.", icon: Shield }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="card" style={{ padding: 'clamp(1rem, 2vw, 1.8rem)', background: '#F8FAFC', textAlign: 'center' }}>
                  <IconComp size={36} color="#0A0B3D" style={{ marginBottom: 'clamp(0.5rem, 1vw, 1rem)' }} />
                  <h4 style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#0A0B3D', marginBottom: 'clamp(0.3rem, 0.8vw, 0.5rem)' }}>{item.title}</h4>
                  <p style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.82rem)', color: '#64748B', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 3vw, 3.5rem)' }}>
            <button onClick={() => setCurrentPage('quote')} className="btn btn-navy" style={{ borderRadius: '50px', backgroundColor: '#0A0B3D', padding: 'clamp(0.6rem, 1.5vw, 0.85rem) clamp(1.2rem, 2.5vw, 1.8rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>
              REQUEST A QUOTE FOR YOUR SECTOR <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7: CLIENT TESTIMONIALS                               */}
      {/* ------------------------------------------------------------- */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 5.5rem) 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto clamp(1.5rem, 3vw, 3.5rem) auto' }}>
            <span className="section-subtitle" style={{ color: '#0A0B3D' }}>CLIENT TESTIMONIALS</span>
            <h2 className="section-title" style={{ color: '#0A0B3D', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>Success Stories, to know about our Security</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(1rem, 2vw, 2rem)' }}>
            {CASE_STUDIES.map(cs => (
              <div key={cs.id} className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 2rem)', background: '#FFFFFF' }}>
                <div style={{ display: 'flex', gap: '0.2rem', color: '#D4AF37', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#0A0B3D" />)}
                </div>

                <p style={{ fontSize: 'clamp(0.8rem, 1.6vw, 0.92rem)', color: '#475569', fontStyle: 'italic', lineHeight: '1.6', marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)' }}>
                  "{cs.solution} Results achieved: {cs.results}"
                </p>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 'clamp(0.6rem, 1vw, 1rem)', display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1vw, 0.8rem)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(10, 11, 61, 0.08)', color: '#0A0B3D', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)' }}>
                    MS
                  </div>
                  <div>
                    <h5 style={{ fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)', color: '#0A0B3D', margin: 0 }}>{cs.client}</h5>
                    <span style={{ fontSize: 'clamp(0.65rem, 1.3vw, 0.75rem)', color: '#64748B' }}>{cs.industry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 8: BOTTOM DEEP NAVY BLUE CTA BANNER (#0A0B3D)         */}
      {/* ------------------------------------------------------------- */}
      <section className="cta-banner-blue" style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #16185E 100%)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 2.2rem)', color: '#FFFFFF', marginBottom: 'clamp(0.6rem, 1.5vw, 1rem)', fontFamily: 'Montserrat, sans-serif', lineHeight: '1.3' }}>
            Our Security Experts Are Here To Help
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', maxWidth: '650px', margin: '0 auto clamp(1rem, 2vw, 2rem) auto', lineHeight: '1.6' }}>
            Contact our Dodoma Headquarters team to schedule a site risk assessment and receive an official commercial proposal.
          </p>
          <button onClick={() => setCurrentPage('contact')} className="btn" style={{ background: '#D4AF37', color: '#0A0B3D', borderRadius: '50px', padding: 'clamp(0.65rem, 1.5vw, 0.95rem) clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 'bold', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>
            GET STARTED NOW <ArrowRight size={16} />
          </button>
        </div>
      </section>

    </div>
  );
}
