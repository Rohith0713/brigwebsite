import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  {
    name: 'Sri Kasireddy Narayan Reddy',
    title: 'Chairman',
    subtitle: 'MLA, Kalwakurthy',
    image: '/images/college/chairman.webp',
    quote: 'Education is the foundation of a prosperous society. We are committed to providing quality technical education that transforms lives.',
    credentials: 'Visionary Leader & Public Servant',
    color: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Mr. Kasireddy Durga Prasad Reddy',
    title: 'Vice Chairman',
    subtitle: 'Young & Dynamic Leader',
    image: '/images/college/vice-chairman.webp',
    quote: 'Innovation and excellence drive our institution forward. We nurture talent and shape future leaders.',
    credentials: 'Driving Innovation in Education',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Dr. V. Veeranna',
    title: 'Director / Principal',
    subtitle: 'Faculty of Engineering',
    image: '/images/college/director.webp',
    quote: 'Our focus is on holistic development of students, combining academic excellence with practical skills.',
    credentials: 'M.Tech, Ph.D | 17+ Years Experience',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Dr. Ch. Kantlam',
    title: 'Principal',
    subtitle: 'Faculty of Pharmacy',
    image: '/images/college/principal-pharmacy.webp',
    quote: 'Pharmaceutical education at BRIG prepares students for global healthcare challenges.',
    credentials: 'M.Pharm, Ph.D | 17+ Years Experience',
    color: 'from-green-500 to-emerald-500',
  },
];

const Leadership = () => {
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
      className="relative py-20 lg:py-32 bg-[#f8fafc] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#1e3a8a]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-4">
            Our Leadership
          </span>
          <h2 className="heading-lg text-[#1e293b] mb-4">
            Guided by Visionaries
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Under the leadership of experienced academicians and dedicated professionals,
            BRIG continues to redefine standards in technical education
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100
                       hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Top Accent */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${leader.color}`} />

              <div className="grid sm:grid-cols-5 gap-0">
                {/* Image */}
                <div className="sm:col-span-2 relative h-64 sm:h-full overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${leader.color} opacity-0 
                                  group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${leader.color} rounded-full 
                                    flex items-center justify-center shadow-lg`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="sm:col-span-3 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-[#1e293b] group-hover:text-[#1e3a8a] transition-colors">
                        {leader.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 bg-gradient-to-r ${leader.color} text-white text-sm font-medium rounded-full`}>
                          {leader.title}
                        </span>
                        <span className="text-sm text-gray-500">{leader.subtitle}</span>
                      </div>
                    </div>

                    {/* Credentials */}
                    <p className="text-sm text-[#1e3a8a] font-medium mb-4">
                      {leader.credentials}
                    </p>

                    {/* Quote */}
                    <div className="relative bg-gray-50 rounded-xl p-4 mb-4">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
                      <p className="text-sm text-gray-600 italic leading-relaxed pl-2">
                        "{leader.quote}"
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Together, they guide BRIG towards excellence in education and innovation
          </p>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
