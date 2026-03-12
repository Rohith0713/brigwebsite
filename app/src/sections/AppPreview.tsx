import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const screens = [
  {
    image: '/images/app/app-home.jpeg',
    title: 'Dashboard',
    description: 'Your personalized home screen with all important updates at a glance.',
  },
  {
    image: '/images/app/app-radio-session.jpeg',
    title: 'Live Radio',
    description: 'Stream Radio live with background playback support.',
  },
  {
    image: '/images/app/app-placements-new.jpeg',
    title: 'Placements',
    description: 'Browse and apply to job opportunities ',
  },
  {
    image: '/images/app/app-updates.jpeg',
    title: 'College Updates',
    description: 'Stay updated with the latest campus news and announcements.',
  },
];

const AppPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      // Carousel animation
      const carouselTrigger = ScrollTrigger.create({
        trigger: carouselRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(carouselRef.current,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true
      });
      triggers.push(carouselTrigger);
    });

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % screens.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <section
      id="placements"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#f8fafc] to-white" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#f8fafc] to-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-4">

          </span>
          <h2 className="heading-lg text-[#1e293b] mb-4">
            Experience Brig Radio
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Take a sneak peek at what awaits you inside the app
          </p>
        </div>

        {/* 3D Carousel */}
        <div ref={carouselRef} className="relative perspective-1000">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg
                     flex items-center justify-center text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white
                     transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg
                     flex items-center justify-center text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white
                     transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="relative h-[500px] sm:h-[600px] flex items-center justify-center">
            {screens.map((screen, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-out preserve-3d"
                  style={{
                    transform: `
                      translateX(${offset * 280}px) 
                      translateZ(${isActive ? 0 : -200 * absOffset}px) 
                      rotateY(${offset * -15}deg)
                      scale(${isActive ? 1 : 0.8 - absOffset * 0.1})
                    `,
                    opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3,
                    zIndex: screens.length - absOffset,
                  }}
                >
                  {/* Phone Frame */}
                  <div className="relative w-[240px] sm:w-[280px]">
                    {/* Glow for active */}
                    {isActive && (
                      <div className="absolute -inset-4 bg-[#1e3a8a]/20 rounded-[3rem] blur-2xl" />
                    )}

                    <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-10" />

                      {/* Screen */}
                      <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/19]">
                        <img
                          src={screen.image}
                          alt={screen.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay for non-active */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/20" />
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    {isActive && (
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-full">
                        <h3 className="text-lg font-semibold text-[#1e293b] mb-1">
                          {screen.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {screen.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-20">
            {screens.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-[#1e3a8a] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default AppPreview;
