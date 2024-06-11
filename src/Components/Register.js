import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { register } from '../Services/Register';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {

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
        setError(null);

        if (formData.password === formData.confirmPassword) {
            register(formData).then((response) => {
                if (response) {
                    toast.success("You are registered sucessfully, please login",{position: 'bottom-center'})
                    navigate('/login')
                }
            }
            ).catch((error) => toast.error(error.response.data.message,{position: 'bottom-center'}))

        }else{
            toast.error("password and confirmed password are not same, Please enter again!",{position: 'bottom-center'})
        }

    };

    return (
        <>
            <div className="sign-in__wrapper">
                <div className="sign-in__backdrop bg-light rounded"></div>
                <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="h4 mb-2 text-center">Register</div>

                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Mobile No"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="email"
                            placeholder="Email Id"
                            name="emailId"
                            value={formData.emailId}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button className="w-100" variant="primary" type="submit">
                        Register
                    </Button>
                    <Link to="/login" className="link d-grid justify-content-start">
                        Register already? Please Login
                    </Link>
                </Form>
            </div>
        </>
    );
};

export default Register;
