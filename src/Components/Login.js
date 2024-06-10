import React, { useState } from "react";
import '../Css/Home.css'
import '../Css/Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from "./Header";
import Footer from "./Footer";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login, isTokenValid } from "../Services/Login";
import getUserByUserName from "../Services/GetUserByUserName";
import { getCart } from "../Services/Cart";



const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: val });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)

        login(formData).then((response) => {
            console.log(response)

            if (response.status === 200) {
                localStorage.setItem('token', response.data.jwtToken);
                localStorage.setItem('login', true);

                isTokenValid(localStorage.getItem('token')).then((response) => {
                    localStorage.setItem('tokenValid', response.data.status)
                }

                ).catch((error) => console.log(error));

                getUserByUserName(response.data.userName).then((response) => {

                    localStorage.setItem('userName', response.data.firstName)

                    localStorage.setItem('userId', response.data.id)

                    getCart(localStorage.getItem('userId')).then((response) => {
                        if (response) {
                            localStorage.setItem('cartItem', response.cartitems.length);
                            window.location.reload()
                        }
                    });
                })
            }
            navigate('/home');

        }).catch((error) => console.log(error));

    };

    return (
        <>
            <div className="sign-in__wrapper" >
                <div className="sign-in__backdrop bg-light rounded"></div>
                <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="h4 mb-2 text-center">Sign In</div>

                    <Form.Group className="mb-2" controlId="username">
                        <Form.Label>Email Id</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="checkbox">
                        <Form.Check
                            type="checkbox"
                            name="rememberMe"
                            label="Remember me"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button className="w-100" variant="primary" type="submit" disabled={!formData.email || !formData.password}>
                        Login
                    </Button>
                    <Link to="/register" className="link d-grid justify-content-start">New User? Creare an account</Link>
                    <div className="d-grid justify-content-end">
                        <Button
                            className="text-muted px-0"
                            variant="link"
                        >
                            Forgot password?
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Login;