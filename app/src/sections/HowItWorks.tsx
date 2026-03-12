import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, UserCheck, LayoutDashboard, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Download the App',
    description: 'Get Brig Radio from Google Play Store. iOS version coming soon!',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Register & Verify',
    description: 'Sign up using your email address. Quick verification ensures security.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Explore Dashboard',
    description: 'Discover all features - radio, placements, updates, and more at your fingertips.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '04',
    icon: Users,
    title: 'Stay Connected',
    description: 'Participate in campus life like never before. Share, report, and engage!',
    color: 'from-orange-500 to-amber-500',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(titleRef.current?.children || [],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        },
        once: true
      });
      triggers.push(titleTrigger);

      // Line animation
      const lineTrigger = ScrollTrigger.create({
        trigger: lineRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(lineRef.current, {
            scaleY: self.progress,
            duration: 0.1
          });
        }
      });
      triggers.push(lineTrigger);

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const stepTrigger = ScrollTrigger.create({
          trigger: step,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(step,
              {
                y: 60,
                opacity: 0,
                scale: 0.9
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power3.out'
              }
            );

            // Animate number count
            const numberEl = step.querySelector('.step-number');
            if (numberEl) {
              gsap.fromTo(numberEl,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, delay: index * 0.15 + 0.3, ease: 'back.out(1.7)' }
              );
            }
          },
          once: true
        });
        triggers.push(stepTrigger);
      });
    });

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-brig-bg-light overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-light-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-block text-sm font-semibold text-primary-blue uppercase tracking-wider mb-4">
            Getting Started
          </span>
          <h2 className="heading-lg text-brig-text-dark mb-4">
            How It Works
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Get started with Brig Radio in four simple steps
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 lg:-translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-blue to-light-blue origin-top"
              style={{ height: '100%', transform: 'scaleY(0)' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={el => { stepsRef.current[index] = el; }}
                  className={`relative flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-20 lg:ml-0 ${isEven ? 'lg:pr-20 lg:text-right' : 'lg:pl-20'}`}>
                    <div className={`bg-white rounded-2xl p-6 lg:p-8 shadow-card border border-gray-100
                                  hover:shadow-card-hover transition-all duration-500 group`}>
                      <h3 className="text-xl lg:text-2xl font-bold text-brig-text-dark mb-3
                                   group-hover:text-primary-blue transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="body-md">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 z-10">
                    <div className="relative">
                      {/* Pulse Ring */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full 
                                      animate-ping opacity-20`} />

                      {/* Number Circle */}
                      <div className={`step-number relative w-16 h-16 bg-gradient-to-r ${step.color} 
                                      rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-lg">{step.number}</span>
                      </div>

                      {/* Icon */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full 
                                      shadow-md flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary-blue" />
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-brig-text-gray mb-6">
            Ready to transform your campus experience?
          </p>
          <button className="btn-primary">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
