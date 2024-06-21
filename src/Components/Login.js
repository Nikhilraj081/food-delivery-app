import React, { useEffect, useState } from "react";
import '../Css/Home.css'
import '../Css/Login.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, isTokenValid } from "../Services/Login";
import { getUserByUserName } from "../Services/User";
import { getCart } from "../Services/Cart";
import { toast } from 'react-toastify';
import LoadingOverlay from "./LoadingOverlay";


const Login = () => {
    const [processing, setProcessing] = useState(false);
    const { pathname } = useLocation();
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
        setProcessing(true)
        console.log(formData)

        login(formData).then((response) => {
            console.log(response)

            localStorage.setItem('userEmail', response.data.userName);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.jwtToken);
                localStorage.setItem('login', true);

                isTokenValid(localStorage.getItem('token')).then((response) => {
                    localStorage.setItem('tokenValid', response.data.status)
                }

                ).catch((error) => console.log(error));

                getUserByUserName(response.data.userName).then((response) => {

                    localStorage.setItem('userName', response.data.firstName);

                    localStorage.setItem('userId', response.data.id);

                    getCart(localStorage.getItem('userId')).then((response) => {
                        if (response) {
                            localStorage.setItem('cartItem', response.cartitems.length);
                            setProcessing(false)
                            window.location.reload()
                        }
                    });
                })
            }
            navigate('/');

        }).catch((error) =>
           {
            setProcessing(false);
            toast.error("Invalid email id or password", { position: 'bottom-center' })
           }
        );

    };

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pathname]);

    return (
        <>
            {processing && <LoadingOverlay />}
            <div className='bg-gradient-custom'>
                <Container className="d-flex justify-content-center align-items-center min-vh-100">
                    <Row className="w-100">
                        <Col md={6} lg={4} className="mx-auto">
                            <div className="sign-in__wrapper">
                                <div className="sign-in__backdrop bg-light rounded shadow"></div>
                                <Form className="shadow p-4 bg-white rounded position-relative" onSubmit={handleSubmit}>
                                    {/* Header */}
                                    <div className="h4 mb-4 text-center">Sign In</div>

                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Email Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 d-flex justify-content-between align-items-center" controlId="checkbox">
                                        <Form.Check
                                            type="checkbox"
                                            name="rememberMe"
                                            label="Remember me"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            className="text-muted px-0"
                                            variant="link"
                                        >
                                            Forgot password?
                                        </Button>
                                    </Form.Group>

                                    <Button className="w-100 btn-lg btn-primary mb-3" type="submit" disabled={!formData.email || !formData.password}>
                                        Login
                                    </Button>

                                    <div className="d-flex justify-content-between">
                                        <Link to="/register" className="link">
                                            New User? Create an account
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    );
};

export default Login;