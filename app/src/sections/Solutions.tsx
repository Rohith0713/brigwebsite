import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Radio,
  Newspaper,
  Briefcase,
  Lightbulb,


  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Radio,
    title: 'Live Campus Radio',
    description: 'Official announcements and interactive sessions in real-time. Listen to campus updates, guest lectures, and student discussions anywhere, anytime.',
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
    image: '/images/app/app-radio-session.jpeg',
    benefits: ['Background playback', 'Live notifications', 'Recorded sessions'],
  },
  {
    icon: Newspaper,
    title: 'College Updates Feed',
    description: 'Verified posts from administration. No more rumors or misinformation. Get authentic updates directly from official sources.',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    image: '/images/app/app-updates.jpeg',
    benefits: ['Official only', 'Like', 'Instant notifications'],
  },
  {
    icon: Briefcase,
    title: 'Placement Hub',
    description: 'All job and internship opportunities organized in one place. Track deadlines, bookmark favorites, and never miss an opportunity.',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    image: '/images/app/app-placements-new.jpeg',
    benefits: ['Bookmark jobs', 'Direct apply links', 'Save jobs'],
  },
  {
    icon: Lightbulb,
    title: 'Student Suggestions',
    description: 'Submit ideas and get notified when approved. Your voice matters - contribute to making campus life better for everyone.',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    image: '/images/app/app-suggestions.jpeg',
    benefits: ['Idea submission', 'Approval tracking', 'instant mail'],
  },


];

const Solutions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length
        });

        const lineTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(lineRef.current, {
              strokeDashoffset: length * (1 - self.progress),
              duration: 0.1
            });
          }
        });
        triggers.push(lineTrigger);
      }

      // Feature cards animation
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;

        const featureTrigger = ScrollTrigger.create({
          trigger: feature,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(feature,
              {
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                scale: 0.95
              },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
              }
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
      id="features"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#f8fafc] overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8fafc] to-white" />

      {/* Connected Line SVG */}
      <svg
        className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M 8 0 Q 8 200 8 400 Q 8 600 8 800 Q 8 1000 8 1200 Q 8 1400 8 1600 Q 8 1800 8 2000"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-block text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-4">
            Our Solution
          </span>
          <h2 className="heading-lg text-[#1e293b] mb-4">
            One Platform. Complete Campus Connection.
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Everything you need to stay connected, informed, and engaged with your campus community
          </p>
        </div>

        {/* Features Grid - Zig Zag Layout */}
        <div className="space-y-16 lg:space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={el => { featuresRef.current[index] = el; }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'
                  }`}
              >
                {/* Content */}
                <div className={`${isEven ? 'lg:pr-16' : 'lg:order-2 lg:pl-16'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${feature.lightColor} rounded-xl flex items-center justify-center
                                    transition-transform duration-300 hover:scale-110 flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#1e293b]
                                 hover:text-[#1e3a8a] transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="body-md mb-6">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-3 mb-6">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <CheckCircle2 className={`w-5 h-5 ${feature.color.replace('bg-', 'text-')}`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual - Phone Mockup */}
                <div className={`${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative group">
                    {/* Glow */}
                    <div className={`absolute -inset-4 ${feature.color} opacity-10 rounded-3xl blur-2xl
                                    group-hover:opacity-20 transition-opacity duration-500`} />

                    {/* Phone Frame */}
                    <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl max-w-[280px] mx-auto">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-10" />

                      {/* Screen */}
                      <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/19]">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay with Icon */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                      flex items-end justify-center pb-6">
                          <div className={`w-14 h-14 ${feature.color} rounded-full flex items-center justify-center
                                          shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className={`absolute -top-4 -right-4 w-8 h-8 ${feature.color} rounded-full opacity-50 
                                    animate-bounce-subtle`} />
                    <div className={`absolute -bottom-4 -left-4 w-6 h-6 ${feature.color} rounded-full opacity-30 
                                    animate-bounce-subtle animation-delay-200`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
