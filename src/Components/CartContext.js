// CartContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create a context object
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [toastIdCount, setToastIdCount] = useState(null);

  useEffect(() => {
    // Update cart count from local storage or any other source on mount
    const storedCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    setCartCount(storedCartCount);

    const storedToastIdCount = parseInt(localStorage.getItem('toastIdCount')) || 0;
    setCartCount(storedToastIdCount);


  }, []);

  // Update local storage and cartCount whenever it changes
  useEffect(() => {
    localStorage.setItem('cartCount', cartCount.toString());

    localStorage.setItem('toastIdCount',toastIdCount)
  }, [cartCount, toastIdCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, toastIdCount, setToastIdCount }}>
      {children}
    </CartContext.Provider>
  );
};
