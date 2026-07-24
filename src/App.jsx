import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Coverage from './pages/Coverage';
import Licences from './pages/Licences';
import CaseStudies from './pages/CaseStudies';
import News from './pages/News';
import Careers from './pages/Careers';
import Quotation from './pages/Quotation';
import Support from './pages/Support';
import Contact from './pages/Contact';
import PrivacyNotice from './pages/PrivacyNotice';
import CookieNotice from './pages/CookieNotice';
import Terms from './pages/Terms';
import ApplicantPrivacy from './pages/ApplicantPrivacy';
import HrPortal from './pages/HrPortal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState('en');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} lang={lang} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} lang={lang} />;
      case 'services':
        return <Services setCurrentPage={setCurrentPage} lang={lang} />;
      case 'industries':
        return <Industries setCurrentPage={setCurrentPage} lang={lang} />;
      case 'coverage':
        return <Coverage setCurrentPage={setCurrentPage} lang={lang} />;
      case 'licences':
        return <Licences setCurrentPage={setCurrentPage} lang={lang} />;
      case 'clients':
        return <CaseStudies setCurrentPage={setCurrentPage} lang={lang} />;
      case 'news':
        return <News setCurrentPage={setCurrentPage} lang={lang} />;
      case 'careers':
        return <Careers setCurrentPage={setCurrentPage} lang={lang} />;
      case 'quote':
        return <Quotation setCurrentPage={setCurrentPage} lang={lang} />;
      case 'support':
        return <Support setCurrentPage={setCurrentPage} lang={lang} />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} lang={lang} />;
      case 'privacy':
        return <PrivacyNotice setCurrentPage={setCurrentPage} lang={lang} />;
      case 'cookie':
        return <CookieNotice setCurrentPage={setCurrentPage} lang={lang} />;
      case 'terms':
        return <Terms setCurrentPage={setCurrentPage} lang={lang} />;
      case 'applicant-privacy':
        return <ApplicantPrivacy setCurrentPage={setCurrentPage} lang={lang} />;
      case 'hr-portal':
        return <HrPortal setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} lang={lang} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        lang={lang} 
        setLang={setLang} 
      />

      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} lang={lang} />

      <WhatsAppButton />

      <CookieBanner lang={lang} />
    </div>
  );
}
