import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import eyePassword from "../assets/eyepassword.svg";
import googleIcon from "../assets/google1.svg";
import appleIcon from "../assets/apple-logo1.svg";
import SideImage from "../components/SideImage";
import { useEffect } from "react";

const Signup = () => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [agree, setAgree] = useState(false);
   const { signup } = useContext(AuthContext);
   const navigate = useNavigate();

   useEffect(() => {
      if(localStorage.getItem("token")) {
         navigate("/store");
      }
   }, []);

   const handleSignup = async (e) => {
      e.preventDefault();
      if (agree) {
         try {
            const response = await fetch("https://i-bos-backend.vercel.app/api/auth/signup", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ firstName, lastName, email, password }),
            });
   
            const data = await response.json();
   
            if (response.ok) {
               // Handle successful signup
               localStorage.setItem("token", data.token); // Store JWT token
               navigate("/login"); // Redirect to the store or another page
            } else {
               // Handle errors
               alert(data.msg || "Signup failed");
            }
         } catch (err) {
            console.error("Signup error:", err);
            alert("An error occurred during signup");
         }
      } else {
         alert("You must agree to the Terms & Policy");
      }
   };   
    

   const handleSignInWithGoogle = () => {
      // Google sign-in logic
   };

   const handleSignInWithApple = () => {
      // Apple sign-in logic
   };

   return (
      <div className="flex flex-wrap lg:flex-nowrap w-screen h-screen font-barlow">
         {/* Form Section */}
         <div className="flex items-center justify-center p-6 lg:p-12 w-full lg:w-[55%]">
            <div className="max-w-lg w-full bg-[#FAFAFA] p-10 rounded-lg">
               <div className="text-center mb-6">
                  <h2 className="text-xl font-bold ">Welcome To</h2>
                  <h1 className="text-3xl font-bold">
                     Furni<span className="text-blue-500">Flex</span>
                  </h1>
                  <p className="text-base font-semibold opacity-70">Signup for purchase your desire products</p>
               </div>

               <form onSubmit={handleSignup}>
                  {/* Name Fields Side-by-Side on Large Screens */}
                  <div className="flex flex-col lg:flex-row gap-4 mb-6">
                     <div className="relative flex-1">
                        <input
                           type="text"
                           id="first-name"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           className="block w-full px-3 pb-3 pt-5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 peer"
                        />
                        <label
                           htmlFor="first-name"
                           className={`absolute text-gray-500 text-sm duration-300 transform scale-75 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-[.75] peer-focus:top-1 peer-focus:left-3 peer-focus:text-xs 
                      ${firstName ? "text-xs top-1" : "top-2"}`}
                        >
                           First Name (Optional)
                        </label>
                     </div>
                     <div className="relative flex-1">
                        <input
                           type="text"
                           id="last-name"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           className="block w-full px-3 pb-3 pt-5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 peer"
                        />
                        <label
                           htmlFor="last-name"
                           className={`absolute text-gray-500 text-sm duration-300 transform scale-75 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-[.75] peer-focus:top-1 peer-focus:left-3 peer-focus:text-xs 
                      ${lastName ? "scale-[.75] origin-[0] top-1 left-3 text-xs" : "top-2"}`}
                        >
                           Last Name (Optional)
                        </label>
                     </div>
                  </div>

                  {/* Email */}
                  <div className="relative mb-6">
                     <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full px-3 pb-3 pt-5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 peer"
                     />
                     <label
                        htmlFor="email"
                        className={`absolute text-gray-500 text-sm duration-300 transform scale-75 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-[.75] peer-focus:top-1 peer-focus:left-3 peer-focus:text-xs ${
                           email ? "scale-[.75] top-1 left-3 text-xs" : "top-2"
                        }`}
                     >
                        Email Address
                     </label>
                  </div>

                  {/* Password */}
                  <div className="relative mb-6">
                     <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full px-3 pb-3 pt-5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 peer"
                     />
                     <label
                        htmlFor="password"
                        className={`absolute text-gray-500 text-sm duration-300 transform scale-75 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-[.75] peer-focus:top-1 peer-focus:left-3 peer-focus:text-xs ${
                           password ? "left-3 text-xs top-1" : "top-2"
                        }`}
                     >
                        Password
                     </label>

                     {/* Show/Hide Password Button with Icon */}
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[50%] translate-y-[-50%] right-5 text-gray-500 hover:text-blue-500 flex items-center"
                     >
                        <img className="size-[1.2rem] opacity-65" src={eyePassword} alt="" />
                     </button>
                  </div>

                  {/* Agree to Terms */}
                  <div className="mb-4 flex items-center">
                     <input type="checkbox" id="agree" checked={agree} onChange={() => setAgree(!agree)} required className="mr-2" />
                     <label htmlFor="agree" className="text-sm text-gray-700 font-semibold">
                        I agree to the{" "}
                        <span>
                           <Link className="underline" to="/">
                              Terms & Policy
                           </Link>
                        </span>
                     </label>
                  </div>

                  <button type="submit" className="w-full py-3 px-4 bg-[#000000] font-semibold text-white rounded-md hover:bg-zinc-800">
                     Signup
                  </button>
               </form>
               <div class="pt-4 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                  or
               </div>

               {/* Sign In Buttons Side-by-Side on Large Screens */}
               <div className="mt-4 flex flex-col lg:flex-row gap-4">
                  <button
                     onClick={handleSignInWithGoogle}
                     className="w-full lg:w-1/2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                     <div className="flex gap-2 justify-center items-center">
                        <img src={googleIcon} alt="" />
                        <p className="font-semibold text-xs">Sign in with Google</p>
                     </div>
                  </button>
                  <button
                     onClick={handleSignInWithApple}
                     className="w-full lg:w-1/2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                     <div className="flex gap-2 justify-center items-center">
                        <img src={appleIcon} alt="" />
                        <p className="font-semibold text-xs">Sign in with Apple</p>
                     </div>
                  </button>
               </div>
               <div className="font-semibold mt-6 text-sm text-center">
                  Have an account?{" "}
                  <Link className="text-blue-700 hover:underline" to="/login">
                     Sign In
                  </Link>
               </div>
            </div>
         </div>

         {/* Side Image */}
         <SideImage />
      </div>
   );
};

export default Signup;
