import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Architecture from './pages/Architecture';
import D25 from './pages/D25';
import Industries from './pages/Industries';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Sectors from './pages/Sectors';
import DSIndustries from './pages/DSIndustries';
import QuantaIndustries from './pages/QuantaIndustries';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/d25" element={<D25 />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/ds-industries" element={<DSIndustries />} />
          <Route path="/industries/quanta-industries" element={<QuantaIndustries />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Layout />
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
