import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CrossBtn from "../assets/cross.svg";
import PlusSign from "../assets/plus-sign.svg";
import MinusSign from "../assets/minus-sign.svg";
import { useNavigate } from "react-router-dom";

const Cart = () => {
   const { cartItems, removeItem, updateQuantity } = useContext(CartContext);
   const navigate = useNavigate();
   
   const checkOutHandle = () => {
      if (localStorage.getItem("token")) {
         alert("Checkout feature is not available yet.");
         navigate("/store");
      } else {
         alert("You need to be logged in to checkout.");
         navigate("/login");
      }
   };

   const handleQuantityChange = (id, event) => {
      const newQuantity = parseInt(event.target.value, 10);

      // Ensure that the quantity is not less than 1
      if (newQuantity >= 1) {
         updateQuantity(id, newQuantity);
      }
   };

   const handleQuantityIncrement = (id) => {
      updateQuantity(id, cartItems.find((item) => item.id === id).quantity + 1);
   };

   const handleQuantityDecrement = (id) => {
      const currentQuantity = cartItems.find((item) => item.id === id).quantity;
      if (currentQuantity > 1) {
         updateQuantity(id, currentQuantity - 1);
      }
   };

   return (
      <div className="font-barlow">
         <Navbar />
         <div className="flex flex-col md:flex-row container mx-auto items-center mt-8 mb-2 space-x-0 md:space-x-20">
            <h1 className="text-2xl font-semibold text-center md:text-start w-full md:w-2/3 mb-4 md:mb-0">An overview of your order</h1>
            <h2 className="text-2xl font-semibold w-full md:w-1/3 invisible md:visible">Order Summary</h2>
         </div>
         <div className="flex flex-col md:flex-row container mx-auto py-8 space-x-0 md:space-x-20 mb-12">
            {/* Left side: Cart Items */}
            <div className="w-full md:w-2/3 bg-[#FAFAFA] px-7 py-5 rounded-lg h-fit mb-6 md:mb-0">
               {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                     <div key={item.id} className="relative flex flex-col md:flex-row items-center border-b pb-4 mb-4 last:border-b-0">
                        {/* Remove button */}
                        <button onClick={() => removeItem(item.id)} className="absolute top-0 right-0 p-2 hover:scale-125 transition-all">
                           <img src={CrossBtn} alt="" />
                        </button>

                        <div className="flex flex-col md:flex-row items-center w-full">
                           {/* Quantity adjustment */}
                           <div className="flex items-center mr-4 font-bold border rounded-lg mb-4 md:mb-0">
                              <button
                                 onClick={() => handleQuantityDecrement(item.id)}
                                 className="w-6 h-10 flex items-center justify-center bg-white text-gray-600 font-bold rounded-l-lg shadow-sm hover:bg-gray-100 transition-colors"
                              >
                                 <img src={MinusSign} alt="" />
                              </button>

                              <input
                                 type="number"
                                 min="1"
                                 value={item.quantity}
                                 onChange={(event) => handleQuantityChange(item.id, event)}
                                 className="w-6 h-10 text-center border-0 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                              />

                              <button
                                 onClick={() => handleQuantityIncrement(item.id)}
                                 className="w-6 h-10 flex items-center justify-center bg-white text-gray-600 font-bold rounded-r-lg shadow-sm hover:bg-gray-100 transition-colors"
                              >
                                 <img src={PlusSign} alt="" />
                              </button>
                           </div>

                           <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mb-4 md:mb-0" />
                           <div className="ml-4 flex-1">
                              <h2 className="font-semibold">{item.name}</h2>
                              <p className="text-gray-600 opacity-0">${item.price}</p>
                           </div>

                           <div className="flex-shrink-0 text-gray-600 font-bold mt-12">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                     </div>
                  ))
               ) : (
                  <p>Your cart is empty.</p>
               )}
            </div>

            {/* Right side: Order Summary */}
            <div className="w-full md:w-1/3">
               <div className="bg-[#FAFAFA] border p-6 rounded-lg w-full text-[#656565]">
                  <div className="flex justify-between mb-2">
                     <p>Subtotal</p>
                     <p>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                     <p>Shipping</p>
                     <p>$5.00</p>
                  </div>
                  <div className="flex justify-between mb-2">
                     <p>Estimated Tax</p>
                     <p>$1.50</p>
                  </div>
                  <hr className="my-5"></hr>
                  <div className="flex justify-between font-bold text-xl">
                     <p>Total</p>
                     <p className="text-black">
                        ${(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5.0 + 1.5).toFixed(2)}
                     </p>
                  </div>
               </div>

               <button onClick={checkOutHandle} className="w-full mt-5 py-4 bg-black text-white font-semibold rounded-lg">
                  Go to Checkout
               </button>
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Cart;
