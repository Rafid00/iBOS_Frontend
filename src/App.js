import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext"; // Import the ProductProvider
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Store from "./pages/Store";
import Cart from "./pages/Cart";

const App = () => {
   return (
      <AuthProvider>
         <ProductProvider>
            <CartProvider>
               <Router>
                  <Routes>
                     <Route path="/" element={<Login />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/signup" element={<Signup />} />
                     <Route path="/store" element={<Store />} />
                     <Route path="/cart" element={<Cart />} />
                  </Routes>
               </Router>
            </CartProvider>
         </ProductProvider>
      </AuthProvider>
   );
};

export default App;
