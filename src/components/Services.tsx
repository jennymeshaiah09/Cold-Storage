import React, { useEffect, useRef, useState } from 'react';
import { Apple, Fish, Milk, Wheat, Beef, Grape, ChevronLeft, ChevronRight } from 'lucide-react';

const foodTypes = [
  {
    title: "Fruits & Vegetables",
    image: "/vegies.jpg",
    description: "Store fresh produce like apples, oranges, potatoes, onions, and leafy vegetables with optimal temperature and humidity control.",
    temp: "Recommended Temp: 0°C to 4°C (Chilled)",
    coolingType: "Chilled storage helps maintain freshness and prevent spoilage for fruits and vegetables.",
    features: ["Apples, Oranges, Grapes", "Onions, Carrots", "Leafy vegetables & herbs"]
  },
  {
    title: "Dairy Products",
    image: "/dairy.jpg",
    description: "Preserve milk, cheese, butter, yogurt, and other dairy products with precise temperature maintenance.",
    temp: "Recommended Temp: 1°C to 4°C (Chilled)",
    coolingType: "Chilled storage ensures dairy products remain fresh and safe for consumption.",
    features: ["Fresh milk & cream", "Cheese & butter", "Yogurt"]
  },
  {
    title: "Ice Cream",
    image: "/icecream.webp",
    description: "Keep ice cream and frozen desserts at optimal low temperatures for perfect texture and taste.",
    temp: "Recommended Temp: -18°C to -25°C (Frozen)",
    coolingType: "Deep freezing preserves the texture and flavor of ice cream and frozen desserts.",
    features: ["Ice cream tubs & cones", "Frozen desserts", "Deep freeze storage"]
  },
  {
    title: "Seafood & Fish",
    image: "/seafood.webp",
    description: "Keep fish, prawns, crabs, and other seafood fresh with specialized freezing and chilling systems.",
    temp: "Recommended Temp: -18°C to -25°C (Frozen)",
    coolingType: "Frozen storage prevents spoilage and maintains quality for seafood and fish.",
    features: ["Fresh fish varieties", "Prawns & crabs", "Frozen seafood products"]
  },
  {
    title: "Meat & Poultry",
    image: "/meat.webp",
    description: "Store chicken, mutton, beef, and processed meat products safely with controlled freezing temperatures.",
    temp: "Recommended Temp: -18°C to -25°C (Frozen)",
    coolingType: "Frozen storage is essential for long-term preservation and safety of meat and poultry.",
    features: ["Chicken & poultry", "Mutton & beef", "Processed meat products"]
  },
  {
    title: "Grains & Pulses",
    image: "/grains.jpg",
    description: "Preserve rice, wheat, lentils, and other grains in controlled environments to prevent spoilage and pest damage.",
    temp: "Recommended Temp: 10°C to 15°C (Cool & Dry)",
    coolingType: "Cool, dry storage prevents mold and insect infestation in grains and pulses.",
    features: ["Rice & wheat", "Lentils & pulses", "Processed grain products"]
  },
  {
    title: "Ripening chambers &Pharmaceuticals",
    image: "/pharma.jpg",
    description: "Manages controlled ripening for produce and provides precise, refrigerated storage for temperature-sensitive pharmaceuticals.",
    temp: "Ripening: 13°C to 22°C, Pharmaceutical: 2°C to 8°C",
    coolingType: "Controls temperature, humidity, and gas for ripening; offers stable refrigerated storage for medical-grade products.",
    features: ["Fruits","Vaccines", "Insulin"," etc.."]
  }
];

const services = [
  {
    title: 'Estimation',
    description: 'Accurate cost and time estimates for your projects.',
    image: '/estimation.jpg', // Calculator/Plans
  },
  {
    title: 'Designing',
    description: 'Custom designs tailored to your specific needs.',
    image: '/design.jpg', // Blueprint/Design
  },
  {
    title: 'Supply',
    description: 'High-quality products delivered on time.',
    image: '/supply.jpg', // Warehouse/Truck
  },
  {
    title: 'Installation',
    description: 'Professional installation services for seamless setup.',
    image: '/installation.jpg', // Workers/Install
  },
  {
    title: 'Commissioning',
    description: 'Thorough testing and commissioning to ensure optimal performance.',
    image: '/commison.jpg', // Inspection/Quality
  },
  {
    title: 'After Sales Services',
    description: 'Ongoing support and maintenance (terms & conditions apply).',
    image: '/sales.png', // Support/Maintenance
  },
  {
    title: 'Best Product Performance',
    description: 'Delivered by our most skilled team.',
    image: '/performance.png', // Trophy/Badge
  },
];

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isSliding, setIsSliding] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Auto-slide every 3 seconds, set up interval only once on mount
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      handleSlide('right');
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (selected === null) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selected]);

  const handleSlide = (direction: 'left' | 'right') => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideDirection(direction);
    setPrev(current);
    setCurrent((prevIdx) => {
      if (direction === 'right') {
        return (prevIdx + 1) % services.length;
      } else {
        return (prevIdx - 1 + services.length) % services.length;
      }
    });
    setTimeout(() => setIsSliding(false), 600); // match transition duration
  };

  const goTo = (idx: number) => {
    if (isSliding || idx === current) return;
    setSlideDirection(idx > current ? 'right' : 'left');
    setPrev(current);
    setCurrent(idx);
    setIsSliding(true);
    setTimeout(() => setIsSliding(false), 600);
  };

  return (
    <section id="services" className="py-20 bg-gray-50 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">What You Can Store</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Our cold storage facilities are designed to preserve a wide variety of food products, 
            maintaining their freshness, quality, and nutritional value for extended periods.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodTypes.map((food, index) => (
            <div 
              key={index}
              data-index={index}
              className={`service-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 group transform hover:-translate-y-3 hover:rotate-1 cursor-pointer ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              }}
              onClick={() => setSelected(index)}
            >
              <div className="relative h-32 mb-4 flex items-center justify-center">
                <img src={food.image} alt={food.title} className="absolute inset-0 w-full h-full object-cover object-center rounded-lg" />
                
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                {food.title}
              </h3>
              <div className="text-teal-700 font-medium mb-1">{food.temp}</div>
              <div className="text-xs text-gray-500 mb-2">{food.coolingType}</div>
              <p className="text-gray-600 mb-4 leading-relaxed">{food.description}</p>
              <ul className="space-y-2">
                {food.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional info section */}
        <div className="mt-16 bg-gradient-to-br from-teal-50 to-teal-50 rounded-2xl p-8 border border-teal-100 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Temperature Ranges for Different Foods</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-semibold text-teal-700 mb-2">Chilled Storage</h4>
                <p className="text-gray-600 text-sm mb-2">0°C to 4°C</p>
                <p className="text-gray-500 text-xs">Dairy, vegetables, fruits</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-semibold text-teal-700 mb-2">Frozen Storage</h4>
                <p className="text-gray-600 text-sm mb-2">-18°C to -25°C</p>
                <p className="text-gray-500 text-xs">Meat, seafood, ice cream</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="font-semibold text-teal-700 mb-2">Deep Freeze</h4>
                <p className="text-gray-600 text-sm mb-2">-25°C to -40°C</p>
                <p className="text-gray-500 text-xs">Long-term storage, exports</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-teal-50 to-teal-50 rounded-2xl p-8 border border-teal-100 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-gray-600 mb-4">Cold Frost customizes products according to client requirements and provides the following services:</p>
            <div className="relative w-full h-[400px] md:h-[500px] min-h-[300px] flex items-center justify-center mb-10 overflow-hidden border-2 border-red-500 md:border-none">
              {/* Left Arrow */}
              <button
                className="carousel-arrow carousel-arrow-left"
                style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 30, background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', backdropFilter: 'blur(8px)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => handleSlide('left')}
                aria-label="Previous Service"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              {/* Right Arrow */}
              <button
                className="carousel-arrow carousel-arrow-right"
                style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 30, background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', backdropFilter: 'blur(8px)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => handleSlide('right')}
                aria-label="Next Service"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
              {[prev, current].map((idx, i) => (
                <div
                  key={idx + '-' + i + '-' + (i === 0 ? 'prev' : 'current')}
                  className={`absolute w-full h-full top-0 left-0 transition-transform duration-600 ease-in-out
                    ${i === 0
                      ? slideDirection === 'right'
                        ? '-translate-x-0 animate-slide-out-left'
                        : 'translate-x-0 animate-slide-out-right'
                      : isSliding
                        ? slideDirection === 'right'
                          ? 'translate-x-full animate-slide-in-right'
                          : '-translate-x-full animate-slide-in-left'
                        : 'translate-x-0 z-10'
                    }
                  `}
                  style={{ zIndex: i === 1 ? 20 : 10 }}
                >
                  <img
                    src={services[idx].image}
                    alt={services[idx].title}
                    className="w-full h-full object-cover object-center absolute inset-0 border-2 border-blue-500 md:border-none"
                    draggable={false}
                    style={{ filter: 'none' }}
                    onError={e => { e.currentTarget.src = '/imagee.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                      {services[idx].title}
                    </h3>
                    <p className="text-lg md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto">
                      {services[idx].description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selected !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold" onClick={() => setSelected(null)}>&times;</button>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{foodTypes[selected].title}</h2>
              <img src={foodTypes[selected].image} alt={foodTypes[selected].title} className="w-full h-40 object-cover object-center rounded-lg mb-4" />
              <p className="text-gray-700 mb-4">{foodTypes[selected].description}</p>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {foodTypes[selected].features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div className="text-teal-700 font-medium mb-1">{foodTypes[selected].temp}</div>
              <div className="text-xs text-gray-500 mb-2">{foodTypes[selected].coolingType}</div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slide-in-right {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes slide-in-left {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        @keyframes slide-out-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes slide-out-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s forwards;
        }
        .animate-slide-out-left {
          animation: slide-out-left 0.6s forwards;
        }
        .animate-slide-out-right {
          animation: slide-out-right 0.6s forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .carousel-arrow {
          background: rgba(255,255,255,0.25);
          border-radius: 50%;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          backdrop-filter: blur(8px);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .carousel-arrow:hover {
          background: rgba(255,255,255,0.45);
          box-shadow: 0 6px 32px rgba(0,0,0,0.18);
        }
        .carousel-arrow svg {
          stroke: #222;
        }
      `}</style>
    </section>
  );
};

export default Services;