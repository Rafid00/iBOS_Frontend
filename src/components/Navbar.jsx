import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import cartIcon from "../assets/Added.svg"; // Replace with your cart icon
import userImage from "../assets/Account.png"; // Replace with your dummy user image
import { CartContext } from "../contexts/CartContext"; // Import the CartContext
import { AuthContext } from "../contexts/AuthContext"; // Import the AuthContext
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const { logout } = useContext(AuthContext); // Use the login function from AuthContext
   const { cartItems } = useContext(CartContext); // Access cartItems from CartContext
   const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle

   const navigate = useNavigate();

   // Calculate the total number of items in the cart
   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

   // Toggle the mobile menu
   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   return (
      <nav className="w-full h-[88px] bg-white border-b-[1px]">
         <div className="container mx-auto flex items-center justify-between h-full px-6 lg:px-0">
            {/* Logo */}
            <div className="flex-shrink-0">
               <Link to="/login">
                  <Logo />
               </Link>
            </div>

            {/* Hamburger for Mobile */}
            <div className="lg:hidden">
               <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
               </button>
            </div>

            {/* Navigation Links */}
            <div
               className={`${
                  isOpen ? "block" : "hidden"
               } absolute top-[88px] left-0 w-full bg-white lg:bg-transparent lg:flex lg:relative lg:top-0 lg:w-auto lg:items-center`}
            >
               <Link
                  to="/login"
                  className="block lg:inline-block text-gray-700 hover:bg-[#F8F8F8] px-6 py-2 font-semibold transition-all rounded-md"
               >
                  Home
               </Link>
               <Link
                  to="/store"
                  className="block lg:inline-block text-gray-700 hover:bg-[#F8F8F8] px-6 py-2 font-semibold transition-all rounded-md"
               >
                  Products
               </Link>
               <Link
                  to="/categories"
                  className="block lg:inline-block text-gray-700 hover:bg-[#F8F8F8] px-6 py-2 font-semibold transition-all rounded-md"
               >
                  Categories
               </Link>
               <Link
                  to="/custom"
                  className="block lg:inline-block text-gray-700 hover:bg-[#F8F8F8] px-6 py-2 font-semibold transition-all rounded-md"
               >
                  Custom
               </Link>
               <Link
                  to="/blog"
                  className="block lg:inline-block text-gray-700 hover:bg-[#F8F8F8] px-6 py-2 font-semibold transition-all rounded-md"
               >
                  Blog
               </Link>
            </div>

            {/* Cart and User Profile */}
            <div className="flex items-center space-x-4">
               {/* Shopping Cart Button */}
               <Link to="/cart" className="relative hover:scale-110 transition-all">
                  <img src={cartIcon} alt="Cart" className="w-7 h-7" />
                  {totalItems > 0 && (
                     <span className="absolute bottom-0 right-0 bg-black text-white text-[.65rem] w-[14px] h-[14px] rounded-full flex items-center justify-center">
                        {totalItems}
                     </span>
                  )}
               </Link>

               {/* User Profile Button */}
               <button
                  onClick={() => {
                     logout();
                     navigate("/login");
                  }}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:scale-110 transition-all"
               >
                  <img src={userImage} alt="User" className="w-full h-full object-cover" />
               </button>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
