import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-4 mt-5">
      <div className="container text-center">
        <p className="text-muted mb-0">
          &copy; {new Date().getFullYear()} SocialApp - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;