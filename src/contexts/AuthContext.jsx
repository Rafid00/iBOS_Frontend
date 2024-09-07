import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
   const [authState, setAuthState] = useState({
      isAuthenticated: false,
      user: null,
   });

   // Load auth token from localStorage and update auth state
   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
         // Optionally, verify or decode token before setting state
         setAuthState({
            isAuthenticated: true,
            user: { token },
         });
      }
   }, []);

   const signup = async (firstName, lastName, email, password) => {
      try {
         const response = await fetch("https://i-bos-backend.vercel.app/api/auth/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.msg || "Signup failed");
         }

         localStorage.setItem("token", data.token); // Store token
         setAuthState({
            isAuthenticated: true,
            user: { token: data.token },
         });
      } catch (error) {
         console.error("Signup error:", error.message);
         alert(error.message || "An error occurred during signup");
      }
   };

   const login = async (email, password) => {
      try {
         const response = await fetch("https://i-bos-backend.vercel.app/api/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
         });

         if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
         }

         const data = await response.json();

         // Store token in localStorage and update auth state
         localStorage.setItem("token", data.token);
         setAuthState({
            isAuthenticated: true,
            user: { token: data.token },
         });
         return data; // Return the data if successful
      } catch (error) {
         console.error("Login error:", error.message);
         alert(error.message || "An error occurred during login");
      }
   };

   const logout = () => {
      localStorage.removeItem("token"); // Remove token
      setAuthState({
         isAuthenticated: false,
         user: null,
      });
   };

   return <AuthContext.Provider value={{ authState, signup, login, logout }}>{children}</AuthContext.Provider>;
};
