import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  MapPin,
  Phone,

  ExternalLink
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy.html' },
  { name: 'Terms of Service', href: '/terms.html' },

];



const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(contentRef.current?.children || [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#1e293b] text-white overflow-hidden"
    >
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-[#1e3a8a]">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C240 80 480 0 720 0C960 0 1200 80 1440 40V80H0Z"
            fill="#1e293b"
          />
        </svg>
      </div>

      <div ref={contentRef} className="relative z-10 pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/logos/brig-logo.png"
                  alt="BRIG Logo"
                  className="w-12 h-12 object-contain bg-white rounded-full p-1"
                />
                <div>
                  <h3 className="font-bold text-lg">Brig Radio</h3>
                  <p className="text-xs text-gray-400">by BRIG</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The official campus communication platform for Brilliant Grammar School Educational Society’s Group of Institutions
                Stay connected, informed, and engaged.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">

              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 
                               flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#1e3a8a] transition-all duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 
                               flex items-center gap-2 group"
                    >
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#1e3a8a] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">College website</p>
                    <a href="https://www.bgiic.ac.in/" className="text-white hover:text-[#1e3a8a] transition-colors">
                      https://www.bgiic.ac.in/
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1e3a8a] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+914012345678" className="text-white hover:text-[#1e3a8a] transition-colors">
                      91-990-881-0491

                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1e3a8a] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="text-white">
                      Abdullapur (V), Abdullapurmet (M),
                      Rangareddy (D), Hyderabad,
                      Telangana - 501 513.
                      Landmark: Near Ramoji Filmcity<br />

                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © 2026 BRIG Group of Technical Institutions. All Rights Reserved.
              </p>

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">Version 2.0.1</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span className="text-xs text-gray-500">Made with ❤️ by BRIG Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
