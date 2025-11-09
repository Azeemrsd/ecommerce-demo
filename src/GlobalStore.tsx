import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "./types";

interface StoreContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cartProductCount: number;
}

const GlobalStore = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(GlobalStore);
  if (!context) {
    throw new Error("useStore must be used within a GlobalStoreProvider");
  }
  return context;
};

export const GlobalStoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProductCount, setCartProductCount] = useState(0);
  
  useEffect(() => {
    setCartProductCount(cart.length);
  }, [cart]);

  const value = {
    cart,
    setCart,
    products,
    setProducts,
    cartProductCount,
  };

  return <GlobalStore.Provider value={value}>{children}</GlobalStore.Provider>;
};
