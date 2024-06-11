import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(parseInt(localStorage.getItem('cartItem')) || 0);

    const updateCartItemCount = (count) => {
        setCartItemCount(count);
        localStorage.setItem('cartItem', count);
    };

    return (
        <CartContext.Provider value={{ cartItemCount, updateCartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
