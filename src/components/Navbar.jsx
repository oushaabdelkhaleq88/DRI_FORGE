import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-green-500/30 shadow-lg shadow-green-500/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center gap-2 group relative"
          >
            <div className="relative">
              <Zap 
                className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" 
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 65, 0.6))'
                }}
              />
              <div className="absolute inset-0 bg-green-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div className="flex flex-col items-start leading-none">
              <div className="flex items-baseline gap-1">
                <span 
                  className="text-2xl font-bold font-mono text-green-400 group-hover:text-green-300 transition-colors tracking-wider"
                  style={{
                    textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
                  }}
                >
                  DRI.Forge
                </span>
                <span className="text-green-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{'</>'}</span>
              </div>
              <span className="text-green-600 font-mono text-xs">
                By Ashraf Abdelkhaleq
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-6 py-2 font-mono text-sm tracking-wider transition-all duration-300 group ${
                    isActive 
                      ? 'text-green-400' 
                      : 'text-green-500 hover:text-green-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.label}</span>
                    {/* Hover effect */}
                    <div className="absolute inset-0 border border-green-500/0 group-hover:border-green-500/50 rounded transition-all duration-300"></div>
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full"
                        style={{
                          boxShadow: '0 0 10px rgba(0, 255, 65, 0.8)'
                        }}
                      ></div>
                    )}
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded transition-all duration-300"></div>
                  </>
                )}
              </NavLink>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-green-900">
              <NavLink
                to="/signin"
                className="px-5 py-2 font-mono text-sm text-green-400 hover:text-green-300 border border-green-500/50 hover:border-green-400 rounded transition-all duration-300 tracking-wider hover:shadow-lg hover:shadow-green-500/20"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="relative px-5 py-2 font-mono text-sm font-bold text-black bg-green-500 hover:bg-green-400 rounded transition-all duration-300 tracking-wider overflow-hidden group"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
                }}
              >
                <span className="relative z-10">Sign Up</span>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"></div>
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-green-400 hover:text-green-300 border border-green-500/50 hover:border-green-400 rounded transition-all duration-300"
            style={{
              boxShadow: mobileMenuOpen ? '0 0 15px rgba(0, 255, 65, 0.4)' : 'none'
            }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 border-t border-green-900">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 font-mono text-sm tracking-wider rounded transition-all duration-300 ${
                    isActive
                      ? 'text-green-400 bg-green-500/10 border-l-4 border-green-400'
                      : 'text-green-500 hover:text-green-300 hover:bg-green-500/5 border-l-4 border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            <div className="pt-4 space-y-2 border-t border-green-900 mt-4">
              <NavLink
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 font-mono text-sm text-center text-green-400 hover:text-green-300 border border-green-500/50 hover:border-green-400 rounded transition-all duration-300 tracking-wider"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 font-mono text-sm text-center font-bold text-black bg-green-500 hover:bg-green-400 rounded transition-all duration-300 tracking-wider"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
                }}
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Scanline effect on navbar */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.1) 0px, transparent 1px, transparent 2px)'
        }}
      ></div>
    </nav>
  );
}

export default Navbar;