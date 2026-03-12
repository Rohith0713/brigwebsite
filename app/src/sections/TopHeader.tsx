import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GraduationCap } from 'lucide-react';

const TopHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)' }
      );

      gsap.fromTo(contentRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={headerRef}
      className="w-full bg-white border-b border-gray-200 py-1.5 pt-[env(safe-area-inset-top)] px-4 sm:px-6 lg:px-8 z-50"
    >
      <div className="max-w-full mx-auto px-2">
        {/* Main Header Content */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <img
              ref={logoRef}
              src="/images/logos/brig-logo.png"
              alt="BRIG Logo"
              className="w-11 h-11 sm:w-13 sm:h-13 object-contain"
            />
          </div>

          {/* Center - Institution Name */}
          <div ref={contentRef} className="flex-1">
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-[#1e3a8a] leading-tight">
              Brilliant Grammar School Educational Society's Group of Institutions
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h2 className="text-xs sm:text-sm font-semibold text-[#1e40af]">
                Integrated Campus (Faculty of Engineering and Faculty of Pharmacy)
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                A <span className="font-semibold text-[#1e3a8a]">UGC Autonomous</span> and{' '}
                <span className="font-semibold text-[#1e3a8a]">NAAC 'A' Accredited</span> institution,
                affiliated to <span className="font-semibold text-[#1e3a8a]">JNTUH</span>,
                approved by <span className="font-semibold text-[#1e3a8a]">AICTE</span> and{' '}
                <span className="font-semibold text-[#1e3a8a]">PCI</span>
              </p>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1e3a8a] text-white text-[10px] sm:text-xs font-semibold rounded">
                <GraduationCap className="w-3 h-3" />
                EAPCET Code: BRIG
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                Est. 2009
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
