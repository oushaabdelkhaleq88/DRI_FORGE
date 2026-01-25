import { useState, useEffect } from 'react';
import { Download, Cpu, HardDrive, Zap, Shield, ChevronRight } from 'lucide-react';
// removed useNavigate

function Home() {
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState('DRI.Forge');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  // removed navigate

  useEffect(() => {
    setMounted(true);
    
    const glitchInterval = setInterval(() => {
      const chars = '01{}[]<>/\\|';
      const original = 'DRI.Forge';
      let glitched = original;
      
      if (Math.random() > 0.7) {
        const pos = Math.floor(Math.random() * original.length);
        glitched = original.substring(0, pos) + 
                   chars[Math.floor(Math.random() * chars.length)] + 
                   original.substring(pos + 1);
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText(original), 50);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Trigger download of DeviceInfoCollector.exe
          const downloadLink = document.createElement('a');
          downloadLink.href = '/Downloads/DeviceInfoCollector.exe'; // Relative path from public folder
          downloadLink.download = 'DeviceInfoCollector.exe'; // Suggest filename
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        background: 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.1) 0px, transparent 2px, transparent 4px)',
        animation: 'scanline 8s linear infinite'
      }}></div>

      {/* Matrix-style falling code */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xs font-mono"
            style={{
              left: `${i * 5}%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {[...Array(20)].map((_, j) => (
              <div key={j}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-block">
            <span className="text-green-500 text-sm font-mono mb-2 block tracking-widest">
              {'>'} DRIVER INTELLIGENCE SYSTEM
            </span>
            <h1 className="text-7xl md:text-8xl font-bold font-mono tracking-wider relative mb-4">
              <span className="relative inline-block" style={{
                textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41'
              }}>
                {glitchText}
              </span>
            </h1>
            <p className="text-green-500 font-mono text-base -mt-2 mb-4">By Ashraf Abdelkhaleq</p>
            <p className="text-xl text-green-300 font-mono tracking-wide mt-4">
              Scan. Detect. Update. Optimize.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className={`relative max-w-4xl w-full transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-lg blur-xl opacity-75 animate-pulse"></div>
          
          {/* Content box */}
          <div className="relative bg-black border-2 border-green-500 rounded-lg shadow-2xl shadow-green-500/50 overflow-hidden">
            {/* Top corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 -mt-1 -ml-1 z-10"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 -mt-1 -mr-1 z-10"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 -mb-1 -ml-1 z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 -mb-1 -mr-1 z-10"></div>

            <div className="p-8 md:p-12">
              {/* Hero Section */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-green-400 font-mono mb-4">
                  Outdated Drivers Slow You Down
                </h2>
                <p className="text-green-300 font-mono text-lg">
                  Get a complete hardware analysis in seconds
                </p>
              </div>

              {/* Scan Button */}
              <div className="flex flex-col items-center mb-10">
                <button 
                  onClick={handleScan}
                  disabled={isScanning}
                  className="group relative px-12 py-6 bg-green-500 hover:bg-green-400 text-black font-bold text-2xl font-mono rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Download className="w-8 h-8" />
                    {isScanning ? 'SCANNING...' : 'START SCAN'}
                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -skew-x-12"></div>
                </button>

                {isScanning && (
                  <div className="w-full max-w-md mt-6">
                    <div className="bg-gray-900 border border-green-500 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2 text-sm font-mono">
                        <span className="text-green-400">Downloading scanner...</span>
                        <span className="text-green-300">{scanProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 relative"
                          style={{ width: `${scanProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 border-t border-green-900 pt-8">
                {[
                  {
                    icon: <Cpu className="w-8 h-8" />,
                    title: 'Deep Hardware Scan',
                    desc: 'Analyzes CPU, GPU, motherboard & peripherals'
                  },
                  {
                    icon: <HardDrive className="w-8 h-8" />,
                    title: 'Driver Database',
                    desc: 'Access to millions of official driver versions'
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: 'Instant Results',
                    desc: 'Get your driver report in under 60 seconds'
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: 'Safe & Secure',
                    desc: 'Direct links to official manufacturer sources'
                  }
                ].map((feature, i) => (
                  <div key={i} className="group border border-green-900 hover:border-green-500 rounded-lg p-6 transition-all duration-300 hover:bg-green-950/20">
                    <div className="flex items-start gap-4">
                      <div className="text-green-400 group-hover:text-green-300 transition-colors">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-green-400 font-mono font-bold mb-2 text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-green-600 font-mono text-sm leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-green-900">
                {[
                  { label: 'DEVICES SCANNED', value: '2.5M+' },
                  { label: 'DRIVERS FOUND', value: '15M+' },
                  { label: 'SUCCESS RATE', value: '99.2%' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400 font-mono">{stat.value}</div>
                    <div className="text-xs text-green-600 mt-1 font-mono tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-green-600 font-mono text-sm tracking-widest flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            100% FREE • NO REGISTRATION • INSTANT DOWNLOAD
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

export default Home;