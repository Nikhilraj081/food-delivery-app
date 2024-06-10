import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home'
import Footer from './Components/Footer';
import {  BrowserRouter } from "react-router-dom";
import Body from "./Components/Body";
import { useEffect } from 'react';

function App() {


  return (
      <BrowserRouter>
        <Header />
        <Body />
        <Footer />
      </BrowserRouter>
  );
}

export default App;
