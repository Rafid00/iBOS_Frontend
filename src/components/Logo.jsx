import React from "react";
import fLogo from "../assets/FLogo.svg";

const Logo = () => {
   return (
      <div className="flex gap-2 justify-center items-center">
         <img src={fLogo} alt="FurniFlex Logo" className="w-11" />
         <h1 className="text-2xl font-bold">
            Furni<span className="text-blue-500">Flex</span>
         </h1>
      </div>
   );
};

export default Logo;
