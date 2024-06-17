import React, { useContext, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Css/Navigation.css';
import logo from '../Icon/delivery-man.png'
import cart from '../Icon/cart.png';
import { Image } from "react-bootstrap";

import { clearBrowser, isTokenValid } from "../Services/Login";
import { Link, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from "../Services/StringConversion";
import { CartContext } from "./CartContext";

const Navigation = () => {

    const { cartCount } = useContext(CartContext);

    const [userName, setUserName] = useState('login')
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('login') === 'true') {
            isTokenValid(localStorage.getItem('token')).then((response) => {
                console.log(response)
                if (response.data.status === true) {
                    setUserName(localStorage.getItem('userName'))
                }
            })
        }

    }, []);

    const handleSearch = () => {

        if (searchQuery !== null && searchQuery !== "") {
            navigate(`/search/${searchQuery}`);
        }
    };

    const handleInputChange = (e) => {

        setSearchQuery(e.target.value);
    };


    const Logout = () => {
        navigate('/');
        clearBrowser();
    }

    return (
        <>
            <Navbar className="deep-red-bg" variant="dark" collapseOnSelect expand="lg">
                <Container style={{ color: 'white' }}>
                    <Navbar.Brand as={Link} to="/">
                        <Image src={logo} className="logo" width={50} height={50} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Menu Items" id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/items" state={{ item: "Main Course Veg" }}>Main Course Veg</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/items" state={{ item: "Main Course Non Veg" }}>Main Course Non Veg</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/items" state={{ item: "Rice & Biryani" }}>Rice & Biryani</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/items" state={{ item: "Roti & Naan" }}>Roti & Naan</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/items" state={{ item: "Starter" }}>Starter</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/items" state={{ item: "Pizza" }}>Pizza</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/items" state={{ item: "Burger" }}>Burger</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

                            {localStorage.getItem('login') === 'true' && (
                                <NavDropdown title={capitalizeFirstLetter(userName)} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/order">Order History</NavDropdown.Item>
                                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            )}
                            {localStorage.getItem('login') !== 'true' && (
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            )}
                        </Nav>
                        <Nav>
                            <div className="search-container">
                                <input
                                    type="text"
                                    className="search-bar"
                                    placeholder="Search your meals..."
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                />
                                <button className="search-button" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                            <Nav.Link as={Link} to="/cart" className="cart-container me-auto">
                                <img src={cart} className="cart-image" alt="Cart" />
                                Cart
                                {localStorage.getItem('cartItem') && (
                                    <span className="cart-item-count">
                                        {cartCount}
                                    </span>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
};

export { Navigation };
