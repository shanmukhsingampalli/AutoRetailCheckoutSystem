import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import type { ReactNode } from 'react';

// CartItem interface
export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  unitPrice?: number;
}

// Context type
interface CartContextType {
  cartItems: CartItem[];
  addItem: (id: string) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Local Storage Key
const LOCAL_STORAGE_KEY = 'cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  // Sync to localStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  const addItem = async (id: string) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/product/getProducts`, {
        barcode: id,
    });
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === Number(id));
      if (existingItem) {
        return items.map((item) =>
          item.id === Number(id)
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: item.unitPrice
                  ? item.unitPrice * (item.quantity + 1)
                  : (item.price / item.quantity) * (item.quantity + 1),
              }
            : item
        );
      } else {
        return [
          ...items,
          {
            id: Number(id),
            name: response.data.data.product.name,
            quantity: 1,
            price: response.data.data.product.price,
            unitPrice: response.data.data.product.price,
          },
        ];
      }
    });
  };

  const incrementQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: item.unitPrice
                ? item.unitPrice * (item.quantity + 1)
                : (item.price / item.quantity) * (item.quantity + 1),
            }
          : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                price: item.unitPrice
                  ? item.unitPrice * (item.quantity - 1)
                  : (item.price / item.quantity) * (item.quantity - 1),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
