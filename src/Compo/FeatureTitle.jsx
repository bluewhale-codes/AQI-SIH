import React from 'react';

const FeatureTitle = ({ 
  title,
  description,
  link,
  illustration,
  reverse = false
}) => {
  return (
    <section className="w-full bg-black-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`flex items-center justify-between gap-12 ${
          reverse ? 'flex-row-reverse' : ''
        }`}>
          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl font-bold text-white-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-white-600 leading-relaxed">
              {description}
              {link && (
                <>
                  {' '}
                  <a 
                    href={link.href}
                    className="text-white-900 underline hover:text-gray-700 transition"
                  >
                    {link.text}
                  </a>
                  .
                </>
              )}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};



export default FeatureTitle;
