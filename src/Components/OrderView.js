import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getOrderDetails } from "../Services/Order"; // Assuming you have an API call to fetch order details
import '../Css/Order.css';
import { capitalizeFirstLetter } from "../Services/StringConversion";
import { formatISTDateTime } from "../Services/DateAndTime";
import { clearBrowser, isTokenValid } from "../Services/Login";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";

const OrderPage = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setProcessing(true)
        if (localStorage.getItem('login') !== 'true') {
            navigate('/login');
        } else {

            isTokenValid(localStorage.getItem('token'))
                .then((response) => {
                    localStorage.setItem('tokenValid', response.data.status);
                    if (localStorage.getItem('tokenValid') === 'true') {

                        getOrderDetails(localStorage.getItem('userId')).then(response => {
                            setOrders(response.data);
                            console.log(response.data);
                            setProcessing(false)
                        }).catch(error => {

                            {
                                setProcessing(false);
                                console.log(error);
                            }
                        });

                    }
                    else {
                        setProcessing(false)
                        clearBrowser();
                        navigate('/login');
                    }
                })
        }
        // Fetch order details when component mounts

    }, [pathname]);

    return (
        <>
            {processing && <LoadingOverlay />}
            <div className="order-page-wrapper">
                <Container className="order-page-container mt-5">
                    {orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <Row key={index} className="justify-content-center mb-4">
                                <Col md={8} className="column">
                                    <Card className="order-card">
                                        <Card.Body>
                                            <Card.Text>
                                                <div className="order-header" >
                                                    <p>Order Id - {order.id}</p>
                                                    <p>{formatISTDateTime(order.date, order.time)}</p>
                                                </div>
                                                <div className="order-header" >
                                                    <p>
                                                        Address: {capitalizeFirstLetter(order.address.address)},{" "}
                                                        {capitalizeFirstLetter(order.address.city)},{" "}
                                                        {capitalizeFirstLetter(order.address.state)}
                                                    </p>
                                                    <p
                                                        style={
                                                            order.status === "order not placed"
                                                                ? { color: "red", fontSize: "16px" }
                                                                : { color: "green", fontSize: "16px" }
                                                        }
                                                    >
                                                        {capitalizeFirstLetter(order.status)}
                                                    </p>
                                                </div>
                                                <hr />
                                                {order.items.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="order-body">
                                                        <p className="order-body-name">
                                                            {capitalizeFirstLetter(item.name)}
                                                        </p>
                                                        <p>{capitalizeFirstLetter(item.quantity)} x {item.numOfItem}</p>
                                                        <p>₹{item.specialPrice * item.numOfItem}</p>
                                                    </div>
                                                ))}
                                            </Card.Text>
                                            <div className="order-header">
                                                <p>Delivery Charge</p>
                                                {order.deliveryFee > 0 ? (
                                                    <p>₹{order.deliveryFee}</p>
                                                ) : (
                                                    <p style={{ color: "green", fontSize: "16px" }}>Free</p>
                                                )}
                                            </div>
                                        </Card.Body>
                                        <hr />
                                        <Card.Footer className="d-flex justify-content-end">
                                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Total Bill: ₹{order.totalPrice}
                                            </p>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <div className="display-message">
                            <div className="message-content">
                                <p>There are no orders</p>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </>

    );
};

export default OrderPage;
