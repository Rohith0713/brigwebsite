import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Download, Sparkles, Play } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation - split words
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words,
          { y: 100, opacity: 0, rotateX: -45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.08,
            delay: 0.5,
            ease: 'power3.out'
          }
        );
      }

      // Subheadline
      gsap.fromTo(subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1, ease: 'power2.out' }
      );

      // Buttons
      gsap.fromTo(buttonsRef.current?.children || [],
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 1.2,
          ease: 'back.out(1.7)'
        }
      );

      // Mockup 3D entrance
      gsap.fromTo(mockupRef.current,
        {
          rotateY: -30,
          rotateX: 20,
          z: -500,
          opacity: 0,
          scale: 0.8
        },
        {
          rotateY: 0,
          rotateX: 0,
          z: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.8,
          ease: 'power3.out'
        }
      );

      // Floating animation for mockup
      gsap.to(mockupRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Particles
      const particles = particlesRef.current?.querySelectorAll('.particle');
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: -100 - Math.random() * 200,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: i * 0.3,
            ease: 'power1.out'
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Mouse move effect for mockup
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mockupRef.current) return;

      const rect = mockupRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = ((e.clientX - centerX) / window.innerWidth) * 20;
      const rotateX = ((centerY - e.clientY) / window.innerHeight) * 20;

      gsap.to(mockupRef.current, {
        rotateY: rotateY,
        rotateX: rotateX,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const headlineWords = "The Official Campus Communication Platform of BRIG".split(' ');

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1e3a8a]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl animate-float-slow animation-delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#1e3a8a]/3 to-transparent rounded-full" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-[#1e3a8a]/20 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: `${10 + Math.random() * 30}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1e3a8a]/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#1e3a8a]" />
              <span className="text-sm font-medium text-[#1e3a8a]">New & Improved</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="heading-xl text-[#1e293b] mb-6 perspective-1000"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="word inline-block mr-3">
                  {word === 'BRIG' ? (
                    <span className="text-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadRef}
              className="body-lg max-w-xl mx-auto lg:mx-auto mb-8"
            >
              Stay updated. Never miss placements. All in one app.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/BrigRadio.apk"
                download="BrigRadio.apk"
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                Download Now
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary flex items-center justify-center gap-2 group"
              >
                <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                Explore Features
              </a>
            </div>


          </div>

          {/* Right Content - 3D Mockup */}
          <div className="relative flex justify-center lg:justify-end perspective-1000">
            <div
              ref={mockupRef}
              className="relative preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Phone Frame */}
              <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1e3a8a]/30 to-[#3b82f6]/30 rounded-[3rem] blur-2xl opacity-60" />

                {/* Phone */}
                <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10" />

                  {/* Screen */}
                  <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/19]">
                    <img
                      src="/images/app/app-home.jpeg"
                      alt="Brig Radio App Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-lg p-3 animate-float animation-delay-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">College update</div>
                      <div className="text-[10px] text-gray-500">New Event!</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 top-1/2 bg-white rounded-xl shadow-lg p-3 animate-float animation-delay-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-[#1e3a8a] text-lg">📻</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Live Radio</div>
                      <div className="text-[10px] text-gray-500">On Air Now</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 bottom-1/4 bg-white rounded-xl shadow-lg p-3 animate-float animation-delay-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-lg">🎓</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">New Placement</div>
                      <div className="text-[10px] text-gray-500">Google Hiring!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
