import React, { useEffect, useState } from 'react';
import { Thermometer, Shield, Clock, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="animate-fade-in-up"> COLD FROST</span>
              <span className="block text-teal-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                THE COLD ROOM SOLUTIONS
              </span>
            </h1>
            <h4 className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Where Innovation Meets Perfect Temperature Control.
            </h4>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <a 
                href="#contact" 
                className="group bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Get Quote</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
            </div>
            
            {/* Key features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Thermometer, title: "Precise Control", subtitle: "±0.5°C accuracy", delay: '800ms' },
                { icon: Shield, title: "Reliable", subtitle: "99.9% uptime", delay: '900ms' },
                { icon: Clock, title: "24/7 Support", subtitle: "Pan-India service", delay: '1000ms' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 animate-fade-in-up group hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="bg-teal-600 p-2 rounded-lg group-hover:bg-teal-500 transition-colors duration-300">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">{feature.title}</div>
                    <div className="text-sm text-gray-300">{feature.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <img 
                src="h12.jpg" 
                alt="Cold Storage Facility in India" 
                className="rounded-xl shadow-2xl w-full h-100 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Floating stats */}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;