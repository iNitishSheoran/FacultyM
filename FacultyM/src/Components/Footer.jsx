import React from "react";
import { FaLinkedin, FaInstagram, FaGlobe, FaPhone, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      
      {/* MAIN FOOTER AREA */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold text-[#00b737]">School of ICT – GBU</h3>
          <p className="text-gray-600 text-sm mt-2">
            Advancing excellence in technology, innovation, and research.
          </p>

          {/* University Website */}
          <a
            href="https://www.gbu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#001bb7] hover:text-[#0046ff] mt-4 font-medium transition"
          >
            <FaGlobe className="text-lg" /> www.gbu.ac.in
          </a>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="font-semibold text-gray-800 text-lg mb-3">Important Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-black text-gray-600 cursor-pointer transition">About University</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Schools & Departments</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Academic Programs</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Admissions</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Examination Cell</li>
          </ul>
        </div>

        {/* Department Info */}
        <div>
          <h4 className="font-semibold text-gray-800 text-lg mb-3">Departments</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Computer Science</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Information Technology</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Electronics Engineering</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">ICT Research Wing</li>
            <li className="hover:text-black text-gray-600 cursor-pointer transition">Training & Placement Cell</li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h4 className="font-semibold text-gray-800 text-lg mb-3">Contact Us</h4>
          <div className="space-y-2 text-sm text-gray-700">
            
            <p>School of ICT, Administrative Block</p>
            <p>Gautam Buddha University</p>
            <p>Greater Noida, Uttar Pradesh, India</p>

            <p className="flex items-center gap-2 font-medium text-[#8b0d72]">
              <FaEnvelope /> admissions@gbu.ac.in
            </p>

            <p className="flex items-center gap-2 font-medium text-[#8b0d72]">
              <FaPhone /> 0120-234 4200
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-4">
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

      {/* BOTTOM LEGAL BAR */}
      <div className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} 
            <span className="font-semibold text-[#001bb7]"> Gautam Buddha University</span>.  
            All Rights Reserved.
          </p>

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
