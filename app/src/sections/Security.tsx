import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Mail, Lock, Building2, Server, Fingerprint, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  {
    icon: Mail,
    title: 'Email Verification',
    description: 'Only email addresses can register, ensuring authentic student access.',
  },

  {
    icon: Building2,
    title: 'Official Management',
    description: 'Directly managed by BRIG administration for authentic and reliable communication.',
  },
  {
    icon: Server,
    title: 'Secure Data Handling',
    description: 'Enterprise-grade encryption and security protocols protect your personal information.',
  }
];

const certifications = [
  'End-to-End Encrypted',
];

const Security = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Shield animation
      const shieldTrigger = ScrollTrigger.create({
        trigger: shieldRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(shieldRef.current,
            { scale: 0.5, opacity: 0, rotation: -30 },
            { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
          );

          // Shield glow pulse
          gsap.to(shieldRef.current, {
            boxShadow: '0 0 60px rgba(59, 130, 246, 0.5)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        },
        once: true
      });
      triggers.push(shieldTrigger);

      // Content animation
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(contentRef.current?.children || [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
          );
        },
        once: true
      });
      triggers.push(contentTrigger);

      // Features animation
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;

        const featureTrigger = ScrollTrigger.create({
          trigger: feature,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(feature,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, ease: 'power2.out' }
            );
          },
          once: true
        });
        triggers.push(featureTrigger);
      });
    });

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Shield Visual */}
          <div className="flex flex-col items-center lg:items-start">
            <div
              ref={shieldRef}
              className="relative w-48 h-48 lg:w-64 lg:h-64 mb-8"
            >
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-spin-slow" />

              {/* Inner Ring */}
              <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-full animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

              {/* Shield */}
              <div className="absolute inset-8 bg-gradient-to-br from-white to-blue-100 rounded-3xl 
                            flex items-center justify-center shadow-2xl">
                <Shield className="w-20 h-20 lg:w-28 lg:h-28 text-[#1e3a8a]" />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
                <Lock className="w-6 h-6 text-white" />
              </div>

              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle animation-delay-200">
                <Fingerprint className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Trust Badges */}
            <div ref={contentRef} className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Secure & Official Platform
              </h2>
              <p className="text-blue-100 text-lg mb-6 max-w-md">
                Your security is our top priority. Brig Radio is built with institutional-grade protection.
              </p>

              {/* Certification Badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {certifications.map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm text-white font-medium border border-white/20">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  ref={el => { featuresRef.current[index] = el; }}
                  className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-5 
                            hover:bg-white/20 transition-all duration-300 hover:-translate-y-1
                            border border-white/10 hover:border-white/30
                            ${index === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center
                                  group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <Icon className="w-6 h-6 text-white group-hover:text-[#1e3a8a] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2 text-lg">{feature.title}</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
