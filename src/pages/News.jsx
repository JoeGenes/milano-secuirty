import React, { useState } from 'react';
import { BookOpen, Calendar, Tag, ArrowRight, Search, X, ShieldAlert } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

export default function News({ setCurrentPage, lang }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[lang];

  const filteredArticles = NEWS_ARTICLES.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0A0B3D', color: '#FFF', padding: '4rem 0', borderBottom: '1px solid #1F2937' }}>
        <div className="container">
          <span className="badge badge-navy" style={{ marginBottom: '1rem', backgroundColor: '#1F2937', color: '#F8FAFC' }}>Security Advisory</span>
          <h1 style={{ fontSize: '2.5rem', color: '#FFF', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.01em' }}>
            Security Insights & News
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', maxWidth: '780px', marginTop: '0.8rem', lineHeight: '1.75' }}>
            Practical guidance and professional best practices to help businesses protect people, property and critical operations.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            {['Incident prevention', 'Operational resilience', 'Technology reliability'].map((item) => (
              <div key={item} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '1.1rem' }}>
                <strong style={{ display: 'block', color: '#F8FAFC', marginBottom: '0.35rem' }}>{item}</strong>
                <p style={{ margin: 0, color: 'rgba(248,250,252,0.8)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Practical advice from our security professionals, tailored to Tanzanian business operations.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Input Bar */}
      <section style={{ padding: '2rem 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <Search size={20} color="#0A0B3D" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search security guides (e.g. CCTV, access control, fire safety)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '3rem', minHeight: '52px', borderRadius: '12px', border: '1px solid #CBD5E1' }}
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {filteredArticles.map(art => (
              <div key={art.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.6rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
                    <span style={{ background: '#E2E8F0', color: '#0A0B3D', fontSize: '0.78rem', fontWeight: '700', padding: '0.45rem 0.8rem', borderRadius: '999px', letterSpacing: '0.04em' }}>
                      {art.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} /> {art.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', color: '#0A0B3D', marginBottom: '0.9rem', fontFamily: 'Montserrat, sans-serif' }}>
                    {art.title}
                  </h3>

                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1.8rem' }}>
                    {art.summary}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(art)}
                  className="btn btn-navy"
                  style={{ width: '100%', fontSize: '0.92rem', justifyContent: 'center', padding: '0.85rem 1rem', backgroundColor: '#0A0B3D', borderColor: '#0A0B3D' }}
                >
                  Read the full article <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '780px', padding: '2rem' }}>
            <button
              onClick={() => setSelectedArticle(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#0A0B3D' }}
            >
              <X size={24} />
            </button>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', padding: '0.45rem 0.9rem', borderRadius: '999px', background: '#E2E8F0', color: '#0A0B3D', fontWeight: '700', fontSize: '0.82rem' }}>
              {selectedArticle.category}
            </span>
            <h2 style={{ fontSize: '2rem', color: '#0A0B3D', marginBottom: '0.75rem', fontFamily: 'Montserrat, sans-serif' }}>
              {selectedArticle.title}
            </h2>
            <div style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={14} /> Published on {selectedArticle.date}</span>
              <span>Milano Security Advisory</span>
            </div>

            <div style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '2', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', marginBottom: '2rem' }}>
              <p>{selectedArticle.content}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#64748B' }}>Need tailored security support for your facility?</span>
              <button onClick={() => { setSelectedArticle(null); setCurrentPage('quote'); }} className="btn btn-navy" style={{ padding: '0.8rem 1.25rem', fontSize: '0.92rem' }}>
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
