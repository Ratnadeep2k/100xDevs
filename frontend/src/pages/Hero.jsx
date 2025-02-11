import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <>
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
    <div className="relative h-full w-full bg-white"></div>
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="flex items-center justify-center font-bold text-gray-800 mb-4 text-4xl">
        Welcome
      </div>
     <Link 
        to="/signup"
        className="px-8 py-3 bg-white rounded-lg font-bold text-gray-800 
                   hover:bg-gray-100 transform hover:scale-105 
                   transition-all duration-200 shadow-xl 
                   hover:shadow-xl"
      >
        Get Started
      </Link>
    </div>
    </>
  );
};
