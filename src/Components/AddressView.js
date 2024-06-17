import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../Css/Address.css'; 
import { saveAddress } from "../Services/User";

const AddressPage = () => {
  const [addressData, setAddressData] = useState({
    userName: "",
    address: "",
    pinCode: "",
    state: "",
    city: "",
    landMark: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAddress(addressData, localStorage.getItem('userId'))
      .then((response) => {
        if (response) {
          // Handle success (e.g., show a success message, redirect to another page)
          navigate('/cart', { state: { showModal: true } }); // Redirect to a success page or another page
          console.log(response)
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="bg-gradient-custom">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="address-wrapper">
              <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                <div className="h4 mb-3 text-center">Add Address</div>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    name="userName"
                    value={addressData.userName}
                    onChange={handleChange}
                    required
                    className="p-3"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={addressData.address}
                    onChange={handleChange}
                    required
                    className="p-3"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Pin Code"
                    name="pinCode"
                    value={addressData.pinCode}
                    onChange={handleChange}
                    required
                    className="p-3"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={addressData.state}
                    onChange={handleChange}
                    required
                    className="p-3"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={addressData.city}
                    onChange={handleChange}
                    required
                    className="p-3"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Landmark"
                    name="landMark"
                    value={addressData.landMark}
                    onChange={handleChange}
                    required
                    className="p-3"
                  />
                </Form.Group>

                <Button className="w-100 btn-lg btn-primary mb-3" type="submit">
                  Save Address
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddressPage;
