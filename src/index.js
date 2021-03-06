import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./components/context/user-context";
import { ProductsProvoder } from "./components/context/products-context";
import { CartProvider } from "./components/context/cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* now any app/component inside the app will access the context value inside the UserProvider */}
      <UserProvider>
        <ProductsProvoder>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvoder>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
