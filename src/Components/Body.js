import React from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import ItemsView from "./ItemsView";

const Body = () => {
    return (
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/items" element={<ItemsView />} />
            </Routes>
    );
};

export default Body;