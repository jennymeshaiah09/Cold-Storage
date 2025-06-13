import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Zap } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const equipmentBrands = [
    "Carrier - Premium commercial refrigeration systems",
    "Danfoss - Advanced compressors and controls",
    "Bitzer - High-efficiency screw compressors", 
    "Emerson - Smart temperature monitoring systems",
    "Hubhvacr- Bock Compressor"
  ];

  const technologies = [
    {
      brand: "Carrier",
      product: "AquaEdge Chillers",
      description: "Energy-efficient centrifugal chillers with advanced controls"
    },
    {
      brand: "Danfoss", 
      product: "Turbocor Compressors",
      description: "Oil-free magnetic bearing compressors for reliability"
    },
    {
      brand: "Bitzer",
      product: "Ecostar Condensing Units", 
      description: "CO2 refrigeration systems for sustainable cooling"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Premium Refrigeration Equipment & Technology Partners
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
             At Cold Frost , we specialize in the sales, installation, and servicing of cold rooms tailored to meet the refrigeration needs of businesses across industries. From commercial kitchens and food storage facilities to pharmaceutical and industrial applications, we provide reliable and energy-efficient cold room solutions designed for long-term performance.
            </p>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Technology Partners:</h3>
              {equipmentBrands.map((brand, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-3 transform transition-all duration-500 hover:translate-x-2 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0 animate-pulse" />
                  <span className="text-gray-700 hover:text-gray-900 transition-colors duration-300">{brand}</span>
                </div>
              ))}
            </div>

            <button className="group bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg">
              <a 
                href="#contact" 
                className="group-hover:translate-x-1 transition-transform duration-300 inline-block"
              >
                Get Quote
              </a>
            </button>
          </div>

          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative group">
              <img 
                src="/heroo.jpeg" 
                alt="Premium Refrigeration Equipment" 
                className="rounded-xl shadow-lg w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent rounded-xl group-hover:from-teal-900/30 transition-all duration-300"></div>
            </div>
            
            {/* Equipment showcase */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Featured Equipment:</h3>
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-gray-50 to-teal-50 rounded-xl p-4 hover:from-teal-50 hover:to-teal-100 transition-all duration-300 group cursor-pointer transform hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                >
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-teal-600 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                        {tech.brand} {tech.product}
                      </h4>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;