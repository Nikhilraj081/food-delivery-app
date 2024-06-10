import React, { useEffect } from "react";
import Home from "./Home"
import Login from "./Login"
import Register from "./Register";
import {Routes, Route } from "react-router-dom";
import Cart from "./Cart";



const Body = () => {
    return (
        <>
            <Routes>
                <Route
                    exact
                    path="/home"
                    Component={Home}
                />
            </Routes>
            <Routes>
                <Route
                    exact
                    path="/login"
                    Component={Login}
                />
            </Routes>
            <Routes>
                <Route
                    exact
                    path="/register"
                    Component={Register}
                />
            </Routes>
            <Routes>
                <Route
                    exact
                    path="/cart"
                    Component={Cart}
                />
            </Routes>
        </>
    );
};

export default Body;