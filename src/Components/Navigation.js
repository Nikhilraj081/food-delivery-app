import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Css/Navigation.css';
import logo from '../Icon/delivery-man.png'
import cart from '../Icon/cart.png';
import { Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { clearBrowser, isTokenValid } from "../Services/Login";

const Navigation = () => {

    const [userName, setUserName] = useState('login')
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);

    useEffect(() => {

        if (localStorage.getItem('login') === 'true') {
            isTokenValid(localStorage.getItem('token')).then((response) => {
                console.log(response)
                if (response.data.status === true) {
                    setUserName(localStorage.getItem('userName'))
                }
            })
        }

    })

    const Logout = () => {
       clearBrowser();
    }

    return (
        <>
            <Navbar bg="danger" variant="dark" collapseOnSelect expand="lg"  >
                <Container style={{ color: 'white' }}>
                    <Navbar.Brand as={Link} to="/home">
                        <Image src={logo} class="logo" width={50} height={50} ></Image>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="me-auto" >
                            <NavDropdown
                                title="Menu Items"
                                id="collapsible-nav-dropdown"
                                show={showDropdown}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <NavDropdown.Item as={Link} href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="#action/3.3">Something</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="#pricing">Contact Us</Nav.Link>


                            {localStorage.getItem('login') === 'true' && (
                                <NavDropdown
                                    title={userName}
                                    id="collapsible-nav-dropdown"
                                    show={showDropdown2}
                                    onMouseEnter={() => setShowDropdown2(true)}
                                    onMouseLeave={() => setShowDropdown2(false)}
                                >
                                    <NavDropdown.Item as={Link} href="#action/3.1">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} href="#action/3.1">Order History</NavDropdown.Item>
                                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            )}
                            {localStorage.getItem('login') != 'true' && (
                                <Nav.Link as={Link} to="/login">{userName}</Nav.Link>
                            )}
                        </Nav>
                        <Nav>
                            <input
                                type="text"
                                className="search-hover"
                                placeholder="search items..."
                                class="search-bar"
                            />
                            <button variant="primary" className="search-button">
                                search
                            </button>
                            <Nav.Link as={Link} to="/cart" className="cart-container me-auto" >

                                <img src={cart} className="cart-image"></img>
                                Cart
                                {localStorage.getItem('cartItem') && (
                                    <span className="cart-item-count">
                                        {localStorage.getItem('cartItem')}
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

export default Navigation;
