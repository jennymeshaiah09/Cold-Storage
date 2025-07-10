import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    "https://www.facebook.com/people/Cold-Frost/pfbid0JpwUTLk2FRJjFxp69inndsFjw9tbDME9AxDyGLBR3jkZp9EVZ5N52UTidxDnShb4l/",
    "https://www.linkedin.com/in/cold-frost-402046371/",
    "https://www.instagram.com/cold_frosthyd/"
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl animate-float-delayed"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 animate-fade-in-up">
            <div className="flex items-center mb-6">
              <img 
                src="/imagee.jpg" 
                alt="Cold Frost Logo" 
                className="h-10 w-auto hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
                            Leading provider of advanced cold storage facilities and refrigeration systems - 
                            we deliver precision temperature control solutions.
            </p>
            <div className="flex space-x-4">
              {[Facebook,  Linkedin, Instagram].map((Icon, index) => (
                <a 
                  key={index}
                  href={socialLinks[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-600 p-2 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-110 hover:-rotate-12 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block animate-fade-in-up" style={{ animationDelay: `300ms` }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block animate-fade-in-up" style={{ animationDelay: `350ms` }}>
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block animate-fade-in-up" style={{ animationDelay: `400ms` }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block animate-fade-in-up" style={{ animationDelay: `450ms` }}>
                  Equipment
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block animate-fade-in-up" style={{ animationDelay: `500ms` }}>
                  Contact
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group hover:translate-x-1 transition-transform duration-300">
                <Phone size={18} className="text-teal-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-300">+91 9133431786</p>
                  <p className="text-sm text-gray-400">24/7 Emergency</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group hover:translate-x-1 transition-transform duration-300">
                <Mail size={18} className="text-teal-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-gray-300">coldfrosthyd@gmail.com</p>
              </div>
              <div className="flex items-start space-x-3 group hover:translate-x-1 transition-transform duration-300">
                <MapPin size={18} className="text-teal-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-gray-300">Building No: 1-8-505/D/20</p>
                  <p className="text-gray-300">near SS Cargo, Prakash Nagar</p>
                  <p className="text-gray-300">Begumpet, 500016</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm animate-fade-in-up">
              © 2025 Cold Frost India. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service' ].map((link, index) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-gray-400 hover:text-teal-400 text-sm transition-all duration-300 hover:translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
