import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./componets/ProductList";
import Layout from "./layout/Layout";
import Cart from "./componets/Cart";
import { GlobalStoreProvider } from "./GlobalStore";
import ProductDetails from "./componets/ProductDetails1";

function App() {
  return (
    <GlobalStoreProvider>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<ProductList />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Route>
     </Routes>
    </GlobalStoreProvider>
  );
}

export default App;
