import React from "react";
import signupImage from "../assets/signupimage.png";
import fLogo from "../assets/FLogo.svg";

const SideImage = () => {
   return (
      <div className="relative hidden lg:block h-screen w-[45%]">
         <img src={signupImage} alt="" className="absolute h-full w-full object-cover" />
         <div className="absolute inset-0 bg-black opacity-40"></div>
         <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] gap-2 text-center text-white px-6 max-w-[85%] flex justify-center items-center flex-col">
            <img src={fLogo} alt="FurniFlex" />
            <h1 className="text-5xl font-bold text-white">
               Furni<span className="text-blue-500">Flex</span>
            </h1>
            <p className="text-white text-center">
               Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring
               quality.
            </p>
         </div>
      </div>
   );
};

export default SideImage;
