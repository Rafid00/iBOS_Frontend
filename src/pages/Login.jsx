import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import eyePassword from "../assets/eyepassword.svg";
import googleIcon from "../assets/google1.svg";
import appleIcon from "../assets/apple-logo1.svg";
import SideImage from "../components/SideImage";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [agree, setAgree] = useState(false);
   const { login } = useContext(AuthContext); // Use the login function from AuthContext
   const navigate = useNavigate();

   useEffect(() => {
      if(localStorage.getItem("token")) {
         navigate("/store");
      }
   }, []);

   const handleLogin = async (e) => {
      e.preventDefault();
      if (agree) {
         try {
            const response = await login(email, password);
            console.log("Login response:", response);
            if (response.success) {
               navigate("/store");
            } else {
               const errorData = await response.text(); // HTML response
               console.error("Error:", errorData);
               alert("Login failed: " + response.statusText);
            }
         } catch (error) {
            console.error("An error occurred:", error);
            alert("Login failed. Please check your credentials.");
         }
      } else {
         alert("Please agree to the terms & policy.");
      }
   };
   

   const handleForgotPassword = () => {
      // Forgot password logic here
   };

   const handleSignInWithGoogle = () => {
      // Google sign-in logic here
   };

   const handleSignInWithApple = () => {
      // Apple sign-in logic here
   };

   return (
      <div className="flex flex-wrap lg:flex-nowrap w-screen h-screen font-barlow">
         {/* Form Section */}
         <div className="flex items-center justify-center p-6 lg:p-12 w-full lg:w-[55%]">
            <div className="max-w-lg w-full bg-[#FAFAFA] p-10 rounded-lg">
               <div className="text-start mb-6">
                  <h2 className="text-4xl font-semibold mb-1">Welcome Back!</h2>
                  <p className="text-base font-semibold opacity-70">Enter your credentials to access your account</p>
               </div>

               <form onSubmit={handleLogin}>
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
                  <div className="relative">
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

                     {/* Show/Hide Password Button */}
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[50%] translate-y-[-50%] right-5 text-gray-500 hover:text-blue-500 flex items-center"
                     >
                        <img className="size-[1.2rem] opacity-65" src={eyePassword} alt="Show/Hide Password" />
                     </button>
                  </div>

                  {/* Forget Password */}
                  <div className="mt-2 mb-6 text-right font-semibold text-sm">
                     <button onClick={handleForgotPassword} className="text-blue-600 hover:underline">
                        Forgot Password
                     </button>
                  </div>

                  {/* Agree to Terms */}
                  <div className="mb-4 flex items-center">
                     <input
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                        required
                        className="mr-2"
                     />
                     <label htmlFor="agree" className="text-sm text-gray-700 font-semibold">
                        I agree to the{" "}
                        <span>
                           <Link className="underline" to="/">
                              Terms & Policy
                           </Link>
                        </span>
                     </label>
                  </div>

                  <button type="submit" className="w-full py-3 px-4 bg-[#000000] hover:bg-zinc-800 font-semibold text-white rounded-md">
                     Sign In
                  </button>
               </form>

               <div className="pt-4 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                  or
               </div>

               {/* Sign In Buttons Side-by-Side on Large Screens */}
               <div className="mt-4 flex flex-col lg:flex-row gap-4">
                  <button
                     onClick={handleSignInWithGoogle}
                     className="w-full lg:w-1/2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                     <div className="flex gap-2 justify-center items-center">
                        <img src={googleIcon} alt="Google" />
                        <p className="font-semibold text-xs">Sign in with Google</p>
                     </div>
                  </button>
                  <button
                     onClick={handleSignInWithApple}
                     className="w-full lg:w-1/2 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                     <div className="flex gap-2 justify-center items-center">
                        <img src={appleIcon} alt="Apple" />
                        <p className="font-semibold text-xs">Sign in with Apple</p>
                     </div>
                  </button>
               </div>

               <div className="font-semibold mt-6 text-sm text-center">
                  <p className="text-sm">
                     Don't have an account?{" "}
                     <button onClick={() => navigate("/signup")} className="text-blue-700 hover:underline">
                        Sign Up
                     </button>
                  </p>
               </div>
            </div>
         </div>

         {/* Side Image */}
         <SideImage />
      </div>
   );
};

export default Login;
