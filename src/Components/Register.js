import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import "../Css/Register.css"

const Register = () => {
    return (
        <>
            <div className="sign-in__wrapper" >
                <div className="sign-in__backdrop bg-light rounded"></div>
                <Form className="shadow p-4 bg-white rounded">
                    {/* Header */}
                    <div className="h4 mb-2 text-center">Register</div>

                    <Form.Group className="mb-2" controlId="username">
                        
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="username">
                       
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="username">
                        
                        <Form.Control
                            type="text"
                            placeholder="Mobile No"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="username">
                       
                        <Form.Control
                            type="text"
                            placeholder="Email Id"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="password">
                        
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </Form.Group>  
                    <Form.Group className="mb-2" controlId="password">
                        
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            required
                        />
                    </Form.Group>  
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Register
                    </Button>
                    <Link to="/login" className="link d-grid justify-content-start">Register already? Please Login </Link>
                </Form>
            </div>
        </>
    );
};

export default Register;