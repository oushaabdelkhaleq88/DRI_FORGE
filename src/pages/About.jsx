import { useState, useEffect } from 'react';
import { Shield, Zap, Target, Users, Code, Sparkles } from 'lucide-react';

function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Lightning Fast",
      description: "Scan your entire system in under 60 seconds with our optimized scanning engine"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "100% Safe",
      description: "Direct links to official manufacturer sources - no bundled software or malware"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Precision Detection",
      description: "Advanced hardware detection algorithms identify every component accurately"
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Developer Grade",
      description: "Built with cutting-edge technology for reliability and performance"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "User Friendly",
      description: "Simple interface that works for everyone - from beginners to experts"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Always Updated",
      description: "Continuous database updates ensure you get the latest driver versions"
    }
  ];

  const stats = [
    { value: "2.5M+", label: "Systems Scanned" },
    { value: "15M+", label: "Drivers Detected" },
    { value: "99.2%", label: "Success Rate" },
    { value: "24/7", label: "Availability" }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative pt-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        background: 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.1) 0px, transparent 2px, transparent 4px)',
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="text-green-500 text-sm font-mono tracking-widest">
              {'>'} ABOUT_US.EXE
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold font-mono mb-6" style={{
            textShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
          }}>
            About DRI.Forge
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto"></div>
        </div>

        {/* Mission Statement */}
        <div className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-lg blur-xl opacity-30"></div>
            <div className="relative bg-black border-2 border-green-500 rounded-lg p-8 md:p-12">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400"></div>

              <p className="text-lg md:text-xl text-green-300 leading-relaxed font-mono mb-6">
                DRI.Forge is a project made by a STEM student to help people find the latest drivers for their hardware
                without the need for experience or technical knowledge. With our advanced scanning engine, you can get 
                a complete hardware analysis in seconds. We are constantly updating our database to ensure you get the latest drivers for your hardware.
              </p>
              <p className="text-lg md:text-xl text-green-300 leading-relaxed font-mono">
                Our mission is to simplify the complex world of driver updates, 
                making it accessible to everyone, from tech enthusiasts to everyday users. 
                Say goodbye to compatibility issues and system instabilities, and embrace a smoother computing experience.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {stats.map((stat, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-0.5 bg-green-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gray-900 border border-green-500/30 group-hover:border-green-500 rounded-lg p-6 text-center transition-all">
                <div className="text-3xl md:text-4xl font-bold text-green-400 font-mono mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-green-600 font-mono tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold font-mono text-center mb-12 text-green-400" style={{
            textShadow: '0 0 15px rgba(0, 255, 65, 0.5)'
          }}>
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className={`group relative transition-all duration-700 delay-${i * 100} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative h-full bg-black border border-green-500/30 group-hover:border-green-500 rounded-lg p-6 transition-all">
                  <div className="text-green-400 group-hover:text-green-300 mb-4 transition-colors" style={{
                    filter: 'drop-shadow(0 0 8px rgba(0, 255, 65, 0.3))'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-mono text-green-400 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-green-600 font-mono text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  {/* Decorative corner */}
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green-900 group-hover:border-green-500 transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg blur-lg opacity-50"></div>
            <div className="relative bg-black border-2 border-green-500 rounded-lg px-8 py-4">
              <p className="text-green-400 font-mono text-lg">
                Ready to optimize your system?
              </p>
              <p className="text-green-600 font-mono text-sm mt-2">
                {'>'} SCAN.NOW() {'<'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;