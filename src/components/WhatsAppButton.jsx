import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Milano Security, I would like to inquire about your security services.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        backgroundColor: '#25D366',
        color: '#FFF',
        borderRadius: '50px',
        padding: '0.75rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
        zIndex: 1500,
        fontWeight: 'bold',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.9rem',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <MessageSquare size={22} color="#FFF" fill="#FFF" />
      <span>WhatsApp Us</span>
    </a>
  );
}
