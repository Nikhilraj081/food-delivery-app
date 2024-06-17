import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home'
import Footer from './Components/Footer';
import { BrowserRouter } from "react-router-dom";
import Body from "./Components/Body";
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './Components/CartContext';


function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Body />
        <Footer />
        <ToastContainer
          position="bottom-right"
        />
      </CartProvider>

    </BrowserRouter>
  );
}

export default App;
