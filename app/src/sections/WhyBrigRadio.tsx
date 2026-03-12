import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, MessageCircle, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: CheckCircle2,
    title: 'No Missed Placements',
    description: 'Never miss another job opportunity with timely notifications and deadline reminders.',
    stat: '95%',
    statLabel: 'Placement Awareness',
  },
  {
    icon: MessageCircle,
    title: 'No Confusion in Communication',
    description: 'All official updates in one place. No more scattered information across multiple channels.',
    stat: '100%',
    statLabel: 'Verified Updates',
  },

];

const WhyBrigRadio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(card,
              { y: 60, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
              }
            );

            // Stat counter animation
            const statEl = card.querySelector('.stat-number');
            if (statEl) {
              gsap.fromTo(statEl,
                { scale: 0 },
                { scale: 1, duration: 0.6, delay: index * 0.1 + 0.4, ease: 'back.out(1.7)' }
              );
            }
          },
          once: true
        });
        triggers.push(cardTrigger);
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
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-brig-bg-light to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary-blue uppercase tracking-wider mb-4">
            Impact
          </span>
          <h2 className="heading-lg text-brig-text-dark mb-4">
            Why Brig Radio Matters
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Real benefits that transform the student experience at BRIG
          </p>
        </div>

        {/* Benefits Centered Layout */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
                className="group relative bg-white rounded-2xl p-6 shadow-card border border-gray-100
                         hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-light-blue
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />

                {/* Icon */}
                <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center mb-4
                              group-hover:bg-primary-blue group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary-blue group-hover:text-white transition-colors" />
                </div>

                {/* Stat */}
                <div className="stat-number mb-3" data-value={benefit.stat}>
                  <span className="text-3xl font-bold text-gradient">{benefit.stat}</span>
                  <span className="text-sm text-brig-text-gray ml-2">{benefit.statLabel}</span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-brig-text-dark mb-2
                             group-hover:text-primary-blue transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-sm text-brig-text-gray leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 w-8 h-8 bg-primary-blue/0 rounded-full
                              flex items-center justify-center opacity-0 group-hover:opacity-100
                              group-hover:bg-primary-blue transition-all duration-300">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl lg:text-2xl text-brig-text-dark font-medium italic max-w-3xl mx-auto">
            "Brig Radio isn’t just an application—it’s a unified communication ecosystem that seamlessly connects students with administration, fostering clarity, trust, and engagement."
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">D</span>
            </div>
            <div className="text-left">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBrigRadio;
