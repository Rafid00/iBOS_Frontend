import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/fb.svg";
import instagram from "../assets/ig.svg";
import linkedin from "../assets/li.svg";
import twitter from "../assets/x.svg";
import fLogo from "../assets/FLogo.svg";
import USFlag from "../assets/us.png";

const Footer = () => {
   return (
      <footer className="bg-[#0E0E0E] text-white pb-10 pt-20 px-10 lg:px-0">
         {/* Main Footer Section */}
         <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 text-center md:text-left">
            {/* Logo Section */}
            <div>
               <div className="flex justify-center md:justify-start items-center gap-2 mb-6 md:mb-0">
                  <img src={fLogo} alt="FurniFlex Logo" className="w-11" />
                  <h1 className="text-2xl font-bold">
                     Furni<span className="text-blue-500">Flex</span>
                  </h1>
               </div>
            </div>

            {/* About Us Section */}
            <div className="flex justify-between md:justify-start gap-10 md:gap-24 lg:gap-56">
               <div>
                  <h2 className="text-lg font-semibold mb-4">About Us</h2>
                  <ul className="space-y-2 text-[#81859F] font-semibold">
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Master Plan
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Jobs
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Invest
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Pressroom
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Blog
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Contact
                        </Link>
                     </li>
                  </ul>
               </div>

               <div>
                  <h2 className="text-lg font-semibold mb-4">Explore EEVE</h2>
                  <ul className="space-y-2 text-[#81859F] font-semibold">
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Unlock my Robot Power
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Starlight
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           Robot Platform
                        </Link>
                     </li>
                     <li>
                        <Link to="/" className="hover:text-gray-400">
                           EEVE Roadmap
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Community & Support Section */}
            <div className="justify-self-center md:justify-self-end">
               <h2 className="text-lg font-semibold mb-4">Community & Support</h2>
               <ul className="space-y-2 text-[#81859F] font-semibold">
                  <li>
                     <Link to="/" className="hover:text-gray-400">
                        Willow X Community
                     </Link>
                  </li>
                  <li>
                     <Link to="/" className="hover:text-gray-400">
                        Developer & Maker Access
                     </Link>
                  </li>
                  <li>
                     <Link to="/" className="hover:text-gray-400">
                        Special Cases
                     </Link>
                  </li>
               </ul>
            </div>
         </div>

         {/* Divider */}
         <div className="flex justify-center items-center pb-4 w-full">
            <hr className="border-t border-gray-700 w-[80%]" />
         </div>

         {/* Social Links and Bottom Section */}
         <div className="container mx-auto py-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-4">
               <a href="/" aria-label="Facebook" className="hover:text-gray-400">
                  <img src={facebook} alt="Facebook" />
               </a>
               <a href="/" aria-label="Instagram" className="hover:text-gray-400">
                  <img src={instagram} alt="Instagram" />
               </a>
               <a href="/" aria-label="Twitter" className="hover:text-gray-400">
                  <img src={twitter} alt="Twitter" />
               </a>
               <a href="/" aria-label="LinkedIn" className="hover:text-gray-400">
                  <img src={linkedin} alt="LinkedIn" />
               </a>
            </div>

            {/* Legal Links */}
            <div className="flex justify-center md:justify-center space-x-8 text-[#81859F] font-semibold">
               <Link to="/" className="hover:text-gray-400">
                  March22 Recap
               </Link>
               <Link to="/" className="hover:text-gray-400">
                  Privacy Policy
               </Link>
               <Link to="/" className="hover:text-gray-400">
                  General Terms
               </Link>
               <Link to="/" className="hover:text-gray-400">
                  Contact
               </Link>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center items-center gap-1 md:justify-end">
               <img src={USFlag} alt="US Flag" className="w-6" />
               <p>United States (English)</p>
            </div>
         </div>

         {/* Copyright */}
         <div className="text-[#323544] text-center font-semibold pt-5">
            EEVE © 2024. All rights reserved.
         </div>
      </footer>
   );
};

export default Footer;
