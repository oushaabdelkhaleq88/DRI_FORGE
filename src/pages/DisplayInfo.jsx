import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Cpu, HardDrive, Layout, Monitor, Keyboard, Mouse, Microchip } from 'lucide-react';

function DisplayInfo() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [systemInfo, setSystemInfo] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);

    const fetchSystemInfo = async () => {
      setIsLoading(true);
      setError(null);
      let fetchedInfo = null;

      // Prioritize systemInfo from location.state (if redirected from frontend upload)
      if (location.state && location.state.systemInfo) {
        fetchedInfo = location.state.systemInfo;
      } else {
        // Otherwise, try to fetch using filename from URL (if launched from C# app)
        const filename = searchParams.get('filename');
        if (filename) {
          try {
            const response = await fetch(`http://localhost:3000/uploaded-info/${filename}`);
            if (response.ok) {
              const data = await response.json();
              if (data.status === 'success' && data.systemInfo) {
                fetchedInfo = data.systemInfo;
              } else {
                setError(`Failed to retrieve info: ${data.message || 'Invalid response'}`);
              }
            } else {
              setError(`Failed to fetch info: ${response.statusText}`);
            }
          } catch (err) {
            console.error('Error fetching system info:', err);
            setError(`Failed to fetch system info: ${err.message}`);
          }
        } else {
          setError('No system info or filename provided.');
        }
      }

      setSystemInfo(fetchedInfo);
      setIsLoading(false);
    };

    fetchSystemInfo();
  }, [location.state, searchParams]);

  const infoItems = systemInfo ? [
    { label: "CPU", value: systemInfo.CPU, icon: <Cpu /> },
    { label: "RAM", value: `${(parseInt(systemInfo.RAM) / (1024 * 1024 * 1024)).toFixed(2)} GB`, icon: <HardDrive /> },
    { label: "Motherboard", value: systemInfo.Motherboard, icon: <Layout /> },
    { label: "BIOS", value: systemInfo.BIOS, icon: <Microchip /> },
    { label: "Keyboard", value: systemInfo.Keyboard, icon: <Keyboard /> },
    { label: "Touchpad", value: systemInfo.Touchpad, icon: <Mouse /> },
    { label: "Display", value: systemInfo.Display, icon: <Monitor /> },
    { label: "Discrete GPU", value: systemInfo.DiscreteGPU, icon: <Cpu /> },
    { label: "Integrated GPU", value: systemInfo.IntegratedGPU, icon: <Cpu /> },
  ].filter(item => item.value && item.value !== "undefined") : [];

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
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="text-green-500 text-sm font-mono tracking-widest">
              {'>'} SYSTEM_INFO.DISPLAY() 
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-mono text-green-400" style={{
            textShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
          }}>
            Device Report
          </h1>
          <p className="text-green-300 font-mono text-lg mt-4">
            Detailed hardware analysis of your system
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-green-500 font-mono text-lg mt-16">
            <p>Loading system information...</p>
            <p className="mt-4">_</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-mono text-lg mt-16">
            <p>Error: {error}</p>
            <p className="mt-4">Please ensure the backend is running and the file exists.</p>
          </div>
        ) : systemInfo ? (
          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-lg blur-xl opacity-30"></div>
              
              {/* Content box */}
              <div className="relative bg-black border-2 border-green-500 rounded-lg p-8 md:p-12">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {infoItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 border-b border-green-900 pb-3">
                      <div className="text-green-400 mt-1" style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,65,0.3))' }}>{item.icon}</div>
                      <div>
                        <p className="text-green-500 font-mono text-sm uppercase">{item.label}:</p>
                        <p className="text-green-300 font-mono text-base font-bold leading-tight">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-10 pt-6 border-t border-green-900">
                  <p className="text-green-600 font-mono text-sm">
                    Data generated at: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-green-500 font-mono text-lg mt-16">
            <p>No system information available.</p>
            <p className="mt-4">Please ensure the backend is running and a valid filename is provided in the URL.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default DisplayInfo;
