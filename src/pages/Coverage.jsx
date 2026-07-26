import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Mail, Building, Compass, Navigation, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, COVERAGE_REGIONS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import 'leaflet/dist/leaflet.css';

export default function Coverage({ setCurrentPage, lang }) {
  const [selectedRegion, setSelectedRegion] = useState('Dodoma');
  const t = TRANSLATIONS[lang];

  const activeRegionData = COVERAGE_REGIONS.find(r => r.name === selectedRegion) || COVERAGE_REGIONS[0];

  const regionCoordinates = {
    Dodoma: [-6.1622, 35.7516],
    'Dar es Salaam': [-6.7924, 39.2083],
    Mwanza: [-2.5167, 32.9],
    Arusha: [-3.3869, 36.682],
    Kilimanjaro: [-3.0756, 37.3536],
    Tanga: [-5.0686, 39.0981],
    Singida: [-4.8167, 34.75],
    Simiyu: [-2.7431, 33.8813],
    Mara: [-1.5016, 34.8082],
    Shinyanga: [-3.6635, 33.42],
    Morogoro: [-6.8278, 37.659],
    Pwani: [-7.0, 39.0]
  };

  const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const activeMarkerIcon = new L.DivIcon({
    className: 'custom-div-icon',
    html: '<div style="background:#0A0B3D;color:#FFFFFF;border-radius:999px;padding:6px 8px;font-size:12px;font-weight:700;border:2px solid #FFFFFF;box-shadow:0 2px 8px rgba(0,0,0,0.2)">●</div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return (
    <div className="animate-fade-in">
      <section style={{ background: 'linear-gradient(135deg, #0A0B3D 0%, #151A66 100%)', color: '#FFF', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(1.2rem, 3vw, 2.2rem)', alignItems: 'center' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Nationwide Operational Reach</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', color: '#FFF', fontFamily: 'Montserrat, sans-serif', marginBottom: '1rem' }}>
                Coverage across Tanzania, built for responsive security delivery
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', lineHeight: '1.8', maxWidth: '700px' }}>
                Milano Security maintains an operational footprint across 12 key regions, with coordinated field support and rapid response capability for clients nationwide.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: 'clamp(0.9rem, 2vw, 1.2rem)', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#DCE4FF' }}>Live coverage view</div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>{activeRegionData.name}, Tanzania</div>
                </div>
              </div>
              <div style={{ height: 'clamp(220px, 42vw, 320px)', minHeight: '220px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
                <MapContainer center={regionCoordinates[activeRegionData.name] || [-6.1622, 35.7516]} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {COVERAGE_REGIONS.map((reg) => (
                    <Marker
                      key={reg.name}
                      position={regionCoordinates[reg.name] || [-6.1622, 35.7516]}
                      icon={selectedRegion === reg.name ? activeMarkerIcon : markerIcon}
                      eventHandlers={{ click: () => setSelectedRegion(reg.name) }}
                    >
                      <Popup>
                        <strong>{reg.name}</strong><br />
                        {reg.status}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', backgroundColor: '#F3F5F7' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1rem, 2.5vw, 2rem)', alignItems: 'start' }}>
            <div className="card" style={{ padding: 'clamp(1.2rem, 2.5vw, 1.8rem)', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <Compass size={22} color="#0A0B3D" />
                <h2 style={{ fontSize: '1.35rem', color: '#0A0B3D', margin: 0 }}>Operational Regions</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {COVERAGE_REGIONS.map(reg => (
                  <button
                    key={reg.name}
                    onClick={() => setSelectedRegion(reg.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.95rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid',
                      borderColor: selectedRegion === reg.name ? '#0A0B3D' : '#E2E8F0',
                      backgroundColor: selectedRegion === reg.name ? '#0A0B3D' : '#FFF',
                      color: selectedRegion === reg.name ? '#FFFFFF' : '#151821',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '600',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <MapPin size={16} color={selectedRegion === reg.name ? '#FFFFFF' : '#0A0B3D'} />
                      <span>{reg.name}</span>
                    </div>
                    {reg.name === 'Dodoma' && <span className="badge badge-gold">HQ</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <Navigation size={22} color="#0A0B3D" />
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#0A0B3D', margin: 0 }}>{activeRegionData.name} Operational Hub</h3>
                  <span className="badge badge-navy" style={{ marginTop: '0.3rem' }}>{activeRegionData.status}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.2rem', padding: '1rem', background: '#F8FAFC', borderRadius: '10px', marginBottom: '1.2rem' }}>
                <h4 style={{ fontSize: '0.88rem', color: '#0A0B3D', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Regional scope
                </h4>
                <p style={{ color: '#5A6072', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {activeRegionData.details}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#151821', marginBottom: '1.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <Building size={18} color="#0A0B3D" />
                  <span><strong>Postal Contact:</strong> {COMPANY_INFO.postalAddress}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <Phone size={18} color="#0A0B3D" />
                  <span><strong>Regional Dispatch:</strong> {COMPANY_INFO.telephones[0]}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <Mail size={18} color="#0A0B3D" />
                  <span><strong>Official Email:</strong> {COMPANY_INFO.emails[0]}</span>
                </div>
              </div>

              <button onClick={() => setCurrentPage('quote')} className="btn btn-navy" style={{ width: '100%', justifyContent: 'center', borderRadius: '10px' }}>
                Request Deployment in {activeRegionData.name}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
