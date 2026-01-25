import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, MapPin, Clock, Phone } from 'lucide-react';

function Contact() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
    // Your form submission logic here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Global Service"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Response Time",
      value: "24-48 Hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Support",
      value: "support@driforge.com"
    }
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
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="text-green-500 text-sm font-mono tracking-widest">
              {'>'} CONTACT_FORM.INIT()
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-mono mb-4" style={{
            textShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
          }}>
            Get In Touch
          </h1>
          <p className="text-green-300 font-mono text-lg">
            Have questions? We're here to help
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className={`lg:col-span-1 space-y-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {contactInfo.map((info, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-0.5 bg-green-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-black border border-green-500/30 group-hover:border-green-500 rounded-lg p-6 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-green-400 group-hover:text-green-300 transition-colors" style={{
                      filter: 'drop-shadow(0 0 8px rgba(0, 255, 65, 0.3))'
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-green-500 font-mono text-sm mb-1">
                        {info.label}
                      </h3>
                      <p className="text-green-400 font-mono font-bold">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Info Box */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-black border-2 border-green-500 rounded-lg p-6">
                <h3 className="text-green-400 font-mono font-bold mb-3 text-lg">
                  Need Immediate Help?
                </h3>
                <p className="text-green-600 font-mono text-sm leading-relaxed">
                  Check our FAQ section or join our community forum for instant answers.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
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
                  {/* Name Field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-green-400 text-sm font-mono font-bold mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      NAME
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-gray-900 border-2 border-green-500/30 focus:border-green-500 rounded text-green-400 font-mono py-3 px-4 leading-tight transition-all outline-none"
                        style={{
                          boxShadow: focusedField === 'name' ? '0 0 15px rgba(0, 255, 65, 0.3)' : 'none'
                        }}
                        placeholder="Enter your name..."
                        required
                      />
                      {focusedField === 'name' && (
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

                  {/* Message Field */}
                  <div className="relative">
                    <label htmlFor="message" className="block text-green-400 text-sm font-mono font-bold mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      MESSAGE
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-gray-900 border-2 border-green-500/30 focus:border-green-500 rounded text-green-400 font-mono py-3 px-4 leading-tight transition-all outline-none resize-none"
                        style={{
                          boxShadow: focusedField === 'message' ? '0 0 15px rgba(0, 255, 65, 0.3)' : 'none'
                        }}
                        placeholder="Type your message here..."
                        required
                      ></textarea>
                      {focusedField === 'message' && (
                        <div className="absolute right-3 top-3 text-green-400 animate-pulse font-mono">
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
                        <Send className="w-5 h-5" />
                        SEND MESSAGE
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -skew-x-12"></div>
                    </button>
                  </div>

                  {/* Terminal-style footer */}
                  <div className="text-center pt-4 border-t border-green-900">
                    <p className="text-green-600 font-mono text-xs">
                      {'>'} MESSAGE.SEND() → SUCCESS
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;