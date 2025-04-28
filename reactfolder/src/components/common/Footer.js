import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} SocialApp - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;