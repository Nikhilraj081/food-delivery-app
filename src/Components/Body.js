import React from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import ItemsView from "./ItemsView";
import SearchView from "./SearchView";
import OrderView from "./OrderView";
import AddressView from "./AddressView";
import MyProfileView from "./MyProfileView";
import ContactUs from "./ContactUsView";

const Body = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/items" element={<ItemsView />} />
            <Route path="/search/:query" element={<SearchView />} />
            <Route exact path="/order" element={<OrderView />} />
            <Route path="/address" element={<AddressView />} />
            <Route exact path="/profile" element={<MyProfileView />} />
            <Route exact path="/contact" element={<ContactUs />} />
        </Routes>
    );
};

export default Body;