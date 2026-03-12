import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Smartphone, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const APK_URL = '/BrigRadio.apk';
const THANK_YOU_URL = './thank-you.html';

const DownloadCTA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        // 1. Trigger APK download via hidden anchor
        const link = document.createElement('a');
        link.href = APK_URL;
        link.download = 'BrigRadio.apk';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 2. Redirect to thank-you page after a brief delay
        setTimeout(() => {
            window.location.href = THANK_YOU_URL;
        }, 600);
    };

    useEffect(() => {
        const triggers: ScrollTrigger[] = [];

        const ctx = gsap.context(() => {
            // Content entrance
            const contentTrigger = ScrollTrigger.create({
                trigger: contentRef.current,
                start: 'top 80%',
                onEnter: () => {
                    gsap.fromTo(
                        contentRef.current?.children || [],
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
                    );
                },
                once: true,
            });
            triggers.push(contentTrigger);

            // Phone mockup entrance
            const phoneTrigger = ScrollTrigger.create({
                trigger: phoneRef.current,
                start: 'top 85%',
                onEnter: () => {
                    gsap.fromTo(
                        phoneRef.current,
                        { y: 80, opacity: 0, rotation: 8 },
                        { y: 0, opacity: 1, rotation: 0, duration: 1, ease: 'power3.out' }
                    );
                },
                once: true,
            });
            triggers.push(phoneTrigger);

            // Button pulse
            if (buttonRef.current) {
                gsap.to(buttonRef.current, {
                    boxShadow: '0 0 40px rgba(59, 130, 246, 0.5), 0 0 80px rgba(59, 130, 246, 0.2)',
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }
        });

        return () => {
            triggers.forEach((t) => t.kill());
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="download"
            className="relative py-20 lg:py-32 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #2563eb 100%)',
            }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl" />
                <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left – Content */}
                    <div ref={contentRef} className="text-center lg:text-left">
                        {/* Badge */}
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-blue-200 font-medium border border-white/20 mb-6">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            Available for Android
                        </span>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            Get{' '}
                            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                                Brig Radio
                            </span>{' '}
                            Today
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-blue-100/80 mb-8 max-w-lg mx-auto lg:mx-0">
                            Your official campus radio app. Stay connected with live broadcasts, announcements, and everything BRIG — right in your pocket.
                        </p>

                        {/* Download Button */}
                        <button
                            ref={buttonRef}
                            onClick={handleDownload}
                            id="download-cta-button"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1e3a8a] font-bold text-lg rounded-2xl
                         hover:bg-blue-50 hover:scale-105 active:scale-[0.98]
                         transition-all duration-300 shadow-2xl shadow-blue-500/30"
                        >
                            <Download className="w-6 h-6 group-hover:animate-bounce" />
                            Download Brig Radio
                            <span className="text-sm font-normal text-blue-400 ml-1">APK</span>
                        </button>

                        {/* File info */}
                        <p className="mt-4 text-sm text-blue-200/60">
                            v1.0.0 • Android 6.0+ • ~15 MB
                        </p>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                            {['Official App', 'No Ads', 'Lightweight'].map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 text-sm text-white/70"
                                >
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right – Phone Mockup */}
                    <div className="flex justify-center lg:justify-end">
                        <div
                            ref={phoneRef}
                            className="relative w-64 sm:w-72"
                        >
                            {/* Phone frame */}
                            <div className="relative bg-white rounded-[2.5rem] p-2 border border-blue-100 shadow-2xl shadow-blue-900/40">
                                {/* Screen */}
                                <div className="bg-white rounded-[2.1rem] overflow-hidden aspect-[9/19.5] relative flex items-center justify-center">
                                    <video
                                        src="/images/app/logo-animation.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Floating sparkle accents */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Smartphone className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadCTA;
