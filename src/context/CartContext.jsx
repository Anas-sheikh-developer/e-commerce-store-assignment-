import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage se cart load karo taaki refresh pe na hate
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Jab bhi cart change ho, LocalStorage update karo
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart mein item add karna
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check karo product pehle se cart mein hai ya nahi
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Agar hai, toh quantity 1 badha do
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Agar nahi hai, toh naya item quantity 1 ke sath add karo
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Cart se item remove karna
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Item ki quantity update karna (badhana ya ghatana)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Quantity 1 se kam nahi ho sakti
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};