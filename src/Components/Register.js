import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { register } from '../Services/Register';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingOverlay from "./LoadingOverlay";

const Register = () => {

    const [processing, setProcessing] = useState(false);

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        emailId: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        setError(null);

        if (formData.password === formData.confirmPassword) {
            register(formData).then((response) => {
                if (response) {
                    toast.success("You are registered sucessfully, please login", { position: 'bottom-center' })
                    setProcessing(false)
                    navigate('/login')
                }
            }
            ).catch((error) => {
                toast.error(error.response.data.message, { position: 'bottom-center' }) 
                setProcessing(false)}
            )

        } else {
            setProcessing(false)
            toast.error("password and confirmed password are not same, Please enter again!", { position: 'bottom-center' })
           
        }

    };

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pathname]);

    return (
        <>
            {processing && <LoadingOverlay />}
            <div className='bg-gradient-custom'>
                <Container className="d-flex justify-content-center align-items-center min-vh-100 ">
                    <Row className="w-100">
                        <Col md={6} lg={4} className="mx-auto">
                            <div className="registration-wrapper">
                                <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                                    <div className="h4 mb-3 text-center">Register</div>

                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Mobile No"
                                            name="mobileNo"
                                            value={formData.mobileNo}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Id"
                                            name="emailId"
                                            value={formData.emailId}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            className="p-3"
                                        />
                                    </Form.Group>

                                    <Button className="w-100 btn-lg btn-primary mb-3" type="submit">
                                        Register
                                    </Button>

                                    <div className="d-flex justify-content-between">
                                        <Link to="/login" className="link">
                                            Already registered? Please Login
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

export default Register;
