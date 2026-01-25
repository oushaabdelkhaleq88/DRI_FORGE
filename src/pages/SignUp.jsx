import { useState, useEffect } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function SignUp() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up submitted:', formData);
    // Add your sign-up logic here
  };

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

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className={`w-full max-w-md transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="text-green-500 text-sm font-mono tracking-widest">
                {'>'} AUTH.REGISTER() 
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-green-400" style={{
              textShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
            }}>
              Create Account
            </h1>
          </div>

          {/* Sign Up Form */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-lg blur-xl opacity-30"></div>
            
            {/* Form container */}
            <div className="relative bg-black border-2 border-green-500 rounded-lg p-8 md:p-10">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="relative">
                  <label htmlFor="username" className="block text-green-400 text-sm font-mono font-bold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    USERNAME
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-gray-900 border-2 border-green-500/30 focus:border-green-500 rounded text-green-400 font-mono py-3 px-4 leading-tight transition-all outline-none"
                      style={{
                        boxShadow: focusedField === 'username' ? '0 0 15px rgba(0, 255, 65, 0.3)' : 'none'
                      }}
                      placeholder="Choose a username..."
                      required
                    />
                    {focusedField === 'username' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 animate-pulse font-mono">
                        _
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-green-400 text-sm font-mono font-bold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    EMAIL
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-gray-900 border-2 border-green-500/30 focus:border-green-500 rounded text-green-400 font-mono py-3 px-4 leading-tight transition-all outline-none"
                      style={{
                        boxShadow: focusedField === 'email' ? '0 0 15px rgba(0, 255, 65, 0.3)' : 'none'
                      }}
                      placeholder="your@email.com"
                      required
                    />
                    {focusedField === 'email' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 animate-pulse font-mono">
                        _
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label htmlFor="password" className="block text-green-400 text-sm font-mono font-bold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-gray-900 border-2 border-green-500/30 focus:border-green-500 rounded text-green-400 font-mono py-3 px-4 leading-tight transition-all outline-none"
                      style={{
                        boxShadow: focusedField === 'password' ? '0 0 15px rgba(0, 255, 65, 0.3)' : 'none'
                      }}
                      placeholder="************"
                      required
                    />
                    {focusedField === 'password' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 animate-pulse font-mono">
                        _
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-green-400 text-sm font-mono font-bold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-gray-900 border-2 border-green-500/30 focus:border-green-500 rounded text-green-400 font-mono py-3 px-4 leading-tight transition-all outline-none"
                      style={{
                        boxShadow: focusedField === 'confirmPassword' ? '0 0 15px rgba(0, 255, 65, 0.3)' : 'none'
                      }}
                      placeholder="************"
                      required
                    />
                    {focusedField === 'confirmPassword' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 animate-pulse font-mono">
                        _
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="group relative px-10 py-4 bg-green-500 hover:bg-green-400 text-black font-bold font-mono text-lg rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)'
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <UserPlus className="w-5 h-5" />
                      SIGN UP
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -skew-x-12"></div>
                  </button>
                </div>

                {/* Sign In Prompt */}
                <div className="text-center pt-6 border-t border-green-900 mt-8">
                  <p className="text-green-500 font-mono text-sm">
                    Already have an account?
                    <NavLink to="/signin" className="text-green-400 hover:text-green-200 font-bold ml-2">Sign In</NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
