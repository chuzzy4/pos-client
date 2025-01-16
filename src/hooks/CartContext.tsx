// import React, { createContext, useContext, useState, useEffect } from "react";

// interface CartItem {
//   _id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   category: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   updateQuantity: (id: number, increment: boolean) => void;
//   removeItem: (id: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Load cart from localStorage on initialization
//   useEffect(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (newItem: CartItem) => {
//     setCartItems(current => {
//       const existingItem = current.find(item => item._id === newItem._id);
//       if (existingItem) {
//         // Update quantity if item already exists
//         return current.map(item =>
//           item._id === newItem._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       // Add new item to the cart
//       return [...current, { ...newItem, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (_id: number, increment: boolean) => {
//     setCartItems(current =>
//       current.map(item =>
//         item._id === _id
//           ? {
//               ...item,
//               quantity: increment
//                 ? item.quantity + 1
//                 : Math.max(item.quantity - 1, 1),
//             }
//           : item
//       )
//     );
//   };

//   const removeItem = (_id: number) => {
//     setCartItems(current => current.filter(item => item._id !== _id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, increment: boolean) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalQuantity: () => number; // Added this function to get total quantity
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initialization
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(current => {
      const existingItem = current.find(item => item._id === newItem._id);
      if (existingItem) {
        // Update quantity if item already exists
        return current.map(item =>
          item._id === newItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item to the cart
      return [...current, { ...newItem, quantity: 1 }];
    });
  };

  const updateQuantity = (_id: number, increment: boolean) => {
    setCartItems(current =>
      current.map(item =>
        item._id === _id
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const removeItem = (_id: number) => {
    setCartItems(current => current.filter(item => item._id !== _id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Function to calculate the total quantity of items in the cart
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
