import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Code2, BookOpen, Award, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  linkedin: string;
  github: string;
  gradient: string;
  icon?: any;
  hideSocials?: boolean;
  badgeText?: string;
}

const facultyTeam: TeamMember[] = [
  {
    name: 'G.Harika',
    role: 'Department of CSE',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    gradient: 'from-[#0f172a] to-[#334155]',
    icon: Users,
    hideSocials: true,
    badgeText: 'Faculty Mentor',
  },
  {
    name: 'Dr. Javeed MD',
    role: 'R&D Research and Development',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    gradient: 'from-[#0f172a] to-[#334155]',
    icon: BookOpen,
    hideSocials: true,
    badgeText: 'Faculty Mentor',
  },
  {
    name: 'Dr. Kumar Keshamoni',
    role: 'Dean of Academics',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    gradient: 'from-[#0f172a] to-[#334155]',
    icon: Award,
    hideSocials: true,
    badgeText: 'Faculty Mentor',
  },
];

const studentTeam: TeamMember[] = [
  {
    name: 'S. Sanjeeva Kumar',
    role: '23494-CS-027',
    linkedin: 'https://www.linkedin.com/in/ssksanjeevakumar',
    github: 'https://github.com/ssksanjeevakumar',
    gradient: 'from-[#1e3a8a] to-[#3b82f6]',
  },
  {
    name: 'S. Rohith Kumar',
    role: '23494-CS-003',
    linkedin: 'https://www.linkedin.com/in/rohith-k-341868382/',
    github: 'https://github.com/Rohith0713',
    gradient: 'from-[#1e3a8a] to-[#3b82f6]',
  },
  {
    name: 'B. Yuvraj',
    role: '23494-CS-036',
    linkedin: 'https://www.linkedin.com/in/yuvraj-bansetti/',
    github: 'https://github.com/Banisettiyuvraj',
    gradient: 'from-[#1e3a8a] to-[#3b82f6]',
  },
  {
    name: 'S. Sahasra Reddy',
    role: '23494-CS-054',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    gradient: 'from-[#3b82f6] to-[#60a5fa]',
  },
  {
    name: 'Y. Adwitha',
    role: '23494-CS-040',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    gradient: 'from-[#3b82f6] to-[#60a5fa]',
  },
  {
    name: 'M. Priyanka',
    role: '23494-CS-021',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    gradient: 'from-[#3b82f6] to-[#60a5fa]',
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(cardRef.current,
            { y: 50, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power3.out'
            }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-card border border-gray-100
               hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 p-10 flex flex-col items-center justify-center min-h-[280px]"
    >
      {/* Decorative Background Element */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${member.gradient} opacity-[0.05] rounded-bl-full transition-transform duration-700 group-hover:scale-110`} />
      <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${member.gradient} opacity-[0.02] rounded-tr-full transition-transform duration-700 group-hover:scale-110`} />

      {/* Content */}
      <div className="text-center relative z-10">
        <div className={`mb-4 inline-block px-4 py-1 rounded-full bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        <h3 className="text-2xl font-extrabold text-[#1e293b] mb-3
                     group-hover:text-[#1e3a8a] transition-colors duration-300 tracking-tight">
          {member.name}
        </h3>

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-8 h-[2px] bg-gradient-to-r ${member.gradient} rounded-full opacity-40`} />
          <p className="text-xs font-bold text-[#1e3a8a]/60 uppercase tracking-[0.2em]">
            {member.role}
          </p>
          <div className={`w-8 h-[2px] bg-gradient-to-l ${member.gradient} rounded-full opacity-40`} />
        </div>

        {/* Conditional Content: Social Links or Badge */}
        {!member.hideSocials ? (
          <div className="flex justify-center gap-5">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-gray-50/50 backdrop-blur-sm text-gray-400 rounded-xl flex items-center justify-center
                       hover:bg-[#1e3a8a] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1e3a8a]/20"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-gray-50/50 backdrop-blur-sm text-gray-400 rounded-xl flex items-center justify-center
                       hover:bg-gray-900 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        ) : member.badgeText ? (
          <div className="flex justify-center">
            <span className="px-4 py-1.5 rounded-lg bg-gray-50/50 text-[#1e3a8a]/50 text-[10px] font-bold uppercase tracking-widest border border-gray-100/50">
              {member.badgeText}
            </span>
          </div>
        ) : null}
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500`} />

      {/* Bottom Accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${member.gradient}
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
    </div>
  );
};

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
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
            Meet Our Developers
          </span>
          <h2 className="heading-lg text-[#1e293b] mb-4">
            Diploma CSE Students Team
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            The talented students from the Diploma Computer Science Engineering department who engineered Brig Radio
          </p>
        </div>

        {/* Faculty Support */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 bg-[#0f172a]/10 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-[#0f172a]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1e293b]">Main Faculty Support</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {facultyTeam.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Student Team Section */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-[#1e3a8a]/10 rounded-2xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[#1e3a8a]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1e293b]">Developed By</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {studentTeam.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            A proud project by{' '}
            <span className="font-semibold text-[#1e3a8a]">
              Diploma CSE students
            </span>{' '}
            at BRIG, supported by faculty and administration
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
