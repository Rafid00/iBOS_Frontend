import React, { useContext } from "react";
import CartIcon from "../assets/whiteCart.svg";
import { CartContext } from "../contexts/CartContext"; // Import the context

const ProductCard = ({ product }) => {
   const { addItem } = useContext(CartContext); // Access the addItem function from context

   return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full sm:w-[280px] lg:w-[320px] scale-100 lg:scale-[1.1] origin-top lg:hover:scale-[1.12] transition-all duration-300 h-full">
         <img
            src={product.image}
            alt={product.name}
            className="w-full h-[236px] object-contain lg:object-cover rounded-md mb-7"
         />
         <h2 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-1">
            {product.name}
         </h2>
         <div className="flex items-center mb-2">
            <span className="text-xl font-bold text-black mr-2">
               ${product.price}
            </span>
            <span className="text-xl line-through text-gray-500">
               ${product.previousPrice}
            </span>
            <span className="ml-2 text-xl text-red-500 font-semibold">
               {product.discount}% OFF
            </span>
         </div>
         <p className="text-sm text-gray-700 mb-8 line-clamp-2 h-10">
            {product.description}
         </p>
         {/* Add to Cart Button */}
         <button
            className="w-full flex justify-center items-center gap-[10px] py-3 bg-[#0E0E0E] text-white font-bold rounded-md hover:bg-zinc-700 transition-colors"
            onClick={() => addItem(product)} // Call addItem when clicked
         >
            <img src={CartIcon} alt="Cart" />
            <p>Add to Cart</p>
         </button>
      </div>
   );
};

export default ProductCard;
