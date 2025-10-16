import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { GiWoodPile } from 'react-icons/gi'; // Example icon for your brand

const AppFooter = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand and Social Links */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img
          src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1760591831/ChatGPT_Image_Oct_16_2025_10_46_25_AM_1_bhc0mk.png"
          alt="Meri Hawa"
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Providing real-time air quality data for rural communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Live Map</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">City Rankings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Health Info</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About AQI</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Our Data Sources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly air quality reports and alerts.
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-l-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Meri Hawa. All Rights Reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
