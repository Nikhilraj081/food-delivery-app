import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Css/Cart.css'
import { useNavigate } from "react-router-dom";
import { getCart, updateCart, deleteCartItem } from "../Services/Cart";
import deliveryImage from '../Image/delivery.jpg'
import deleteIcon from '../Icon/delete.png'
import { Button } from "react-bootstrap";
import { clearBrowser, isTokenValid } from "../Services/Login";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


const Cart = () => {
    

    const navigate = useNavigate();
    const [cartData, setCartData] = useState(null);
    const [processing, setProcessing] = useState(false); 

    const handleIncrement = (itemId, userId, quantity) => {
        setProcessing(true);
        updateCart(itemId, userId, quantity + 1)
            .then((response) => {
                console.log(response);
                setCartData(response); // Update state after successful update
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => {
                setProcessing(false); // Set processing to false when operation completes
            });
    };


    const handleDecrement = (itemId, userId, quantity) => {
        setProcessing(true);
        if (quantity > 0) {
            if (quantity === 1) {
                deleteCartItem(userId, itemId)
                    .then(() => {
                        return getCart(userId); // Update cart after deletion
                    })
                    .then((response) => {
                        setCartData(response); // Update state after deletion
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                updateCart(itemId, userId, quantity - 1)
                    .then((response) => {
                        setCartData(response); // Update state after successful update
                    })
                    .catch((error) => {
                        console.error(error);
                    }).finally(() => {
                        setProcessing(false); // Set processing to false when operation completes
                    });
            }
        }
    };

    useEffect(() => {

        //To check if token is valid or
        if (localStorage.getItem('login') !== 'true') {
            navigate('/login');
        } else {

            isTokenValid(localStorage.getItem('token'))
            .then((response) => {
                localStorage.setItem('tokenValid', response.data.status);
                if (localStorage.getItem('tokenValid') === 'true') {
                    getCart(localStorage.getItem('userId')).then((response) => {
                        console.log(response)
                        setCartData(response);
                    });
                    
                }
                else{
                    clearBrowser();
                    navigate('/login');
                }
            })

        }
    },[]);

    if (cartData) {
        localStorage.setItem('cartItem', cartData.cartitems.length);
    }
   
    return (
        <Container style={{ height: "auto", marginTop: '10px', position: 'relative', overflow: 'hidden' }}>
            {cartData && cartData.cartitems.length > 0 ? (
                <Row>
                    <Col sm={4} >
                        <img className="cart-image" src={deliveryImage} style={{ width: '400px', height: '500px' }}></img>
                    </Col>
                    <Col sm={4}>
                        {/* Conditional rendering */}

                        {cartData && cartData.cartitems.map((item, index) => (
                            <Row key={index} className="card-container border-0 shadow-none">
                                <div className="card border-0 shadow-none">
                                    <div className="card-body">
                                        <div className="cart-box">
                                            <div style={{ width: '120px' }}>
                                                <h6>{item.name}</h6>
                                            </div>

                                            <div style={{ width: '80px', height: '40px', marginLeft: '30px' }}>
                                                <InputGroup size="sm" style={{}}>
                                                    <Button variant="outline-secondary" onClick={() => handleDecrement(item.cartItemId, localStorage.getItem('userId'), item.numOfItem)} disabled={processing}>-</Button>
                                                    <FormControl style={{ width: '30px', textAlign: 'center' }} type="text" value={item.numOfItem} disabled={processing} readOnly />
                                                    <Button variant="outline-secondary" onClick={() => handleIncrement(item.cartItemId, localStorage.getItem('userId'), item.numOfItem)} disabled={processing}>+</Button>
                                                </InputGroup>
                                            </div>
                                            <p style={{ marginLeft: '30px' }}>₹{item.specialPrice}</p>
                                        </div>
                                        <p className="quantity">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            </Row>
                        ))}
                    </Col>
                    <Col sm={4}>
                        {cartData && (
                            <div className="card price-box">
                                <div className="card-header">
                                    <h6>Price Details</h6>
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <div className="price">
                                            <h6>Price</h6>
                                            <h6 style={{ marginLeft: '200px' }}>₹{cartData.totalPrice + cartData.totalDiscount}</h6>

                                        </div>
                                        <div className="price">
                                            <h6>Discount</h6>
                                            <h6 style={{ marginLeft: '173px', color: '#148046' }}>₹-{cartData.totalDiscount}</h6>
                                        </div>
                                        <div className="price">
                                            <h6>Delivery Charge</h6>
                                            <h6 style={{ marginLeft: '123px' }}>₹{cartData.deliveryFee}</h6>
                                        </div>
                                    </Row>
                                </div>

                                <div className="card-footer">
                                    <h6>Total Price</h6>
                                    <h6 style={{ marginLeft: '180px' }}>₹{cartData.totalPrice}</h6>
                                </div>
                            </div>

                        )}
                        <button className="checkout-button">Proceed to checkout</button>
                    </Col>
                </Row>
            ) : (
                <div className="display-message">
                    <div className="message-content">
                        <p>No items in the cart</p>
                    </div>
                </div>

            )}
        </Container>
    );
};

export default Cart;
