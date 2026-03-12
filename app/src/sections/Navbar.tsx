import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setActiveLink(link.name);
    setIsMobileMenuOpen(false);

    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = () => {
    // 1. Trigger APK download via hidden anchor
    const link = document.createElement('a');
    link.href = '/BrigRadio.apk';
    link.download = 'BrigRadio.apk';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Redirect to thank-you page after a brief delay
    setTimeout(() => {
      window.location.href = './thank-you.html';
    }, 600);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`relative lg:fixed lg:top-20 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
          ? 'py-2'
          : 'py-1'
          }`}
      >
        <div className={`mx-auto transition-all duration-500 ${isScrolled
          ? 'max-w-4xl px-4'
          : 'max-w-full px-4 sm:px-10 lg:px-16'
          }`}>
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg rounded-full px-4 sm:px-6 py-2'
            : 'bg-transparent'
            }`}>
            {/* Logo - Only show when scrolled */}
            <div className={`transition-all duration-300 ${isScrolled ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
              <img
                src="/images/logos/brig-logo.png"
                alt="BRIG"
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${activeLink === link.name
                    ? 'text-[#1e3a8a]'
                    : 'text-gray-600 hover:text-[#1e3a8a]'
                    }`}
                >
                  {link.name}
                  {activeLink === link.name && (
                    <span className="absolute inset-0 bg-[#1e3a8a]/10 rounded-full -z-10" />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button onClick={handleDownload} className="btn-primary flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Download App
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1e3a8a]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1e3a8a]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-30 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute top-32 lg:top-28 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-10 opacity-0'
          }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${activeLink === link.name
                  ? 'bg-[#1e3a8a] text-white'
                  : 'text-gray-600 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <button onClick={handleDownload} className="btn-primary flex items-center justify-center gap-2 mt-4">
              <Download className="w-5 h-5" />
              Download App
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
