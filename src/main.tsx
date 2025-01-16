// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Import your App component
import "./index.css";
import { CartProvider } from "../src/hooks/CartContext";

ReactDOM.render(
  <BrowserRouter>
    {" "}
    {/* Wrap the entire app with BrowserRouter */}
    <CartProvider>
      <App />
    </CartProvider>
    ,
  </BrowserRouter>,
  document.getElementById("root")
);
