import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building2,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Target,
  Lightbulb,
  FlaskConical,
  Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  'UGC Autonomous Institution',
  'NAAC A Grade Accredited',
  'AICTE & PCI Approved',
  'JNTUH Affiliated',
  'ISO Certified',
  'NBA Accredited Programs',
];

const courses = [
  { name: 'B.Tech', specializations: 'CSE, ECE, EEE, Civil, Mechanical', icon: Cpu },
  { name: 'M.Tech', specializations: 'Advanced Specializations', icon: Cpu },
  { name: 'B.Pharmacy', specializations: 'Pharmaceutical Sciences', icon: FlaskConical },
  { name: 'M.Pharmacy', specializations: 'Pharmaceutical Chemistry', icon: FlaskConical },
  { name: 'MBA', specializations: 'Business Administration', icon: Building2 },
  { name: 'Polytechnic', specializations: 'Diploma Programs', icon: GraduationCap },
];

const AboutCollege = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Content animation
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(contentRef.current?.children || [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
          );
        },
        once: true
      });
      triggers.push(contentTrigger);

      triggers.push(contentTrigger);
    });

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-4">
            About Our Institution
          </span>
          <h2 className="heading-lg text-[#1e293b] mb-4">
            BRIG Integrated Campus
          </h2>
          <p className="body-lg max-w-3xl mx-auto">
            A premier institution dedicated to excellence in engineering and pharmaceutical education
          </p>
        </div>

        {/* Main Content Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left - About Text */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Established 2009</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
                Brilliant Grammar School Educational Society's Group of Institutions - Integrated Campus
                (Faculty of Engineering & Faculty of Pharmacy), widely recognized by its EAPCET Counseling
                Code <strong>BRIG</strong>, is a premier institution established under the aegis of
                Brilliant Group of Technical Institutions (BGTI).
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Over the years, BRIG has evolved into one of Telangana's most reputed centers for
              engineering and pharmaceutical education, known for its academic excellence, modern
              infrastructure, and student-centric philosophy.
            </p>

            <p className="text-gray-600 leading-relaxed">
              The Brilliant Group of Technical Institutions (BGTI) was founded in 2008 under the
              Brilliant Grammar School Educational Society (BGSES), headquartered at Abdullapurmet, Hyderabad.
              It comprises multiple Autonomous Engineering Colleges offering MBA and Pharmacy programs.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Courses & Info */}
          <div className="space-y-6">
            {/* Courses Offered */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-[#1e3a8a]" />
                <h3 className="text-xl font-semibold text-[#1e293b]">Programs Offered</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {courses.map((course, i) => {
                  const Icon = course.icon;
                  return (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors group">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-[#1e3a8a] group-hover:scale-110 transition-transform" />
                        <div className="font-semibold text-[#1e3a8a]">{course.name}</div>
                      </div>
                      <div className="text-xs text-gray-500">{course.specializations}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-800">Our Vision</h3>
              </div>
              <p className="text-amber-700 text-sm leading-relaxed">
                To emerge as a leading technical institution fostering innovation, research, and
                holistic development of students to meet global challenges.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-[#1e3a8a]" />
                <h3 className="text-lg font-semibold text-[#1e3a8a]">Our Mission</h3>
              </div>
              <p className="text-[#1e40af] text-sm leading-relaxed">
                To provide quality technical education with state-of-the-art infrastructure,
                experienced faculty, and industry collaborations for producing competent professionals.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section >
  );
};

export default AboutCollege;
