import React from "react";
import { FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#00b737]">School of ICT – GBU</h3>
          <p className="text-gray-600 text-sm mt-1">
            Empowering students with cutting-edge technology & innovation.
          </p>

          {/* Website Link */}
          <a
            href="https://www.gbu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#001bb7] hover:text-[#0046ff] mt-3 font-medium transition"
          >
            <FaGlobe className="text-lg" /> www.gbu.ac.in
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-center md:text-left">
          <h4 className="font-semibold text-gray-700 mb-2">Quick Links</h4>
          <a className="text-gray-600 hover:text-black text-sm transition">About Us</a>
          <a className="text-gray-600 hover:text-black text-sm transition">Programs</a>
          <a className="text-gray-600 hover:text-black text-sm transition">Admissions</a>
          <a className="text-gray-600 hover:text-black text-sm transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="font-semibold text-gray-700 mb-2">Connect With Us</h4>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/school/gautam-buddha-university/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#001bb7] hover:text-[#0046ff] text-3xl transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.instagram.com/gbuofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f314bf] hover:text-[#dc16cc] text-3xl transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          
          {/* Left */}
          <p className="text-center md:text-left">
            Copyright © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#001bb7]">Gautam Buddha University</span>. 
            All rights reserved.
          </p>

          {/* Right links */}
          <div className="flex gap-4 mt-2 md:mt-0">
            <a className="hover:text-black transition cursor-pointer">Privacy Policy</a>
            <span>|</span>
            <a className="hover:text-black transition cursor-pointer">Cookie Policy</a>
            <span>|</span>
            <a className="hover:text-black transition cursor-pointer">Terms of Use</a>
            <span>|</span>
            <a className="hover:text-black transition cursor-pointer">Sitemap</a>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;
