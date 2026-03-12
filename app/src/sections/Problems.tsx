import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pin, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Pin,
    title: 'Important notices get lost',
    description: 'Critical announcements buried in endless WhatsApp chats and email threads.',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: GraduationCap,
    title: 'Placement deadlines get missed',
    description: 'Students miss out on dream opportunities due to lack of timely reminders.',
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-50',
  },
];

const Problems = () => {
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

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(card,
              {
                y: 80,
                opacity: 0,
                rotateX: -15,
              },
              {
                y: index % 2 === 1 ? 40 : 0, // Offset for even cards
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power3.out'
              }
            );
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary-blue uppercase tracking-wider mb-4">
            The Challenge
          </span>
          <h2 className="heading-lg text-brig-text-dark mb-4">
            Challenges Students Face Today
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Everyday struggles that affect student life and academic success
          </p>
        </div>

        {/* Problem Cards - Centered Layout */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 perspective-1000">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
                className={`group relative w-full max-w-sm ${index % 2 === 1 ? 'sm:mt-10' : ''}`}
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-card border border-gray-100 
                              transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2
                              hover:border-primary-blue/20 overflow-hidden">
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 
                                  group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`relative w-14 h-14 ${problem.bgColor} rounded-xl flex items-center justify-center
                                  mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="w-7 h-7 text-gray-700" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-brig-text-dark mb-3 
                               group-hover:text-primary-blue transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-brig-text-gray leading-relaxed">
                    {problem.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${problem.color}
                                  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-brig-text-gray mb-4">
            Sound familiar? You are not alone.
          </p>
          <div className="inline-flex items-center gap-2 text-primary-blue font-semibold">
            <span className="w-8 h-0.5 bg-primary-blue" />
            <span>Brig Radio is the solution</span>
            <span className="w-8 h-0.5 bg-primary-blue" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
