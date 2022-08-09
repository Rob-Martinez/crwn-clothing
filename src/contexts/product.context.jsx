import { createContext, useState } from "react"; // first import context
import PRODUCTS from "../shop.data.json"; // second import the products

// export and initialize the product context and supply the object
export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
