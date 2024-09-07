import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
   // Load cart items from local storage
   const loadCartItems = () => {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
   };

   const [cartItems, setCartItems] = useState(loadCartItems);

   // Save cart items to local storage whenever they change
   useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
   }, [cartItems]);

   // Function to add an item to the cart
   const addItem = (product) => {
      setCartItems((prevItems) => {
         const itemExists = prevItems.find((item) => item.id === product.id);

         if (itemExists) {
            // If the item already exists, increase the quantity
            return prevItems.map((item) =>
               item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
         } else {
            // If the item doesn't exist, add it with quantity 1
            return [...prevItems, { ...product, quantity: 1 }];
         }
      });
   };

   // Function to remove an item from the cart
   const removeItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
   };

   // Function to update the quantity of an item in the cart
   const updateQuantity = (id, newQuantity) => {
      setCartItems((prevItems) =>
         prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
         )
      );
   };

   return (
      <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity }}>
         {children}
      </CartContext.Provider>
   );
};
