import React, { useContext, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Css/Cart.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCart, updateCart, deleteCartItem } from "../Services/Cart";
import deliveryImage from '../Image/delivery.jpg'
import deleteIcon from '../Icon/delete.png'
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { clearBrowser, isTokenValid } from "../Services/Login";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { proceedPayment } from "../Services/payment";
import { getUserByUserName } from "../Services/User";
import { capitalizeFirstLetter } from "../Services/StringConversion";
import LoadingOverlay from "./LoadingOverlay";
import { toast } from "react-toastify";
import { ScrollToTop } from "../Services/Helper";
import { CartContext } from "./CartContext";

const Cart = () => {

    const { cartCount, setCartCount } = useContext(CartContext);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [cartData, setCartData] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [cartAmount, setCartAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleIncrement = (itemId, userId, quantity) => {
        setProcessing(true);

        console.log("cart item data " + "itemId " + itemId + "userId " + userId + "quantity " + quantity);
        updateCart(itemId, userId, quantity + 1)
            .then((response) => {
                setProcessing(false);
                setCartData(response); // Update state after successful update
            })
            .catch((error) => {
                setProcessing(false);
            }).finally(() => {
                setProcessing(false); // Set processing to false when operation completes
            });
    };

    const handleDecrement = (itemId, userId, quantity) => {
        setProcessing(true);

        console.log("cart item data " + "itemId " + itemId + "userId " + userId + "quantity " + quantity);
        if (quantity > 0) {
            if (quantity === 1) {
                deleteCartItem(userId, itemId)
                    .then(() => {
                        setProcessing(true);
                        getCart(userId).then((response) => {
                            if (response) {
                                setCartCount(response.cartitems.length);
                                setProcessing(false);
                            }
                            setCartData(response); // Update cart after deletion
                        });
                    })
                    .then((response) => {
                        setCartData(response); // Update state after deletion
                    })
                    .catch((error) => {
                        setProcessing(false);
                    }).finally(() => {
                        // Set processing to false when operation completes
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

    const checkout = (amount) => {
        setProcessing(true)
        getUserByUserName(localStorage.getItem('userEmail')).then((response) => {
            if (response) {
                setProcessing(false)
                setAddress(response.data.address);
            }
        }
        )
        setShowModal(true);
        setCartAmount(amount);
    }


    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [address, setAddress] = useState(null); // State for set address
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        // Reset selected quantity when modal is closed
    };

    const handlePayment = (selectedAddress, cartId) => {
        if (selectedAddress) {
            proceedPayment(selectedAddress, cartAmount, localStorage.getItem('userId'), cartId, setProcessing, navigate, setCartCount).then(() => {
                getCart(localStorage.getItem('userId')).then((response) => {
                    console.log("under handlePayment method");
                    setCartData(response);
                    setCartCount(response.cartitems.length);
                    setLoading(false);
                }).catch((error) => setLoading(false));
            });

        } else {
            toast.error("No address selected, Please select address!")
        }
        handleCloseModal(); // Close modal after adding to cart
    };



    useEffect(() => {
        window.scrollTo(0, 0);
        toast.dismiss(localStorage.getItem('toastId'))
        setProcessing(true)
        if (location.state?.showModal) {
            setShowModal(true);
        }
        //To check if token is valid or
        if (localStorage.getItem('login') !== 'true') {
            setProcessing(false)
            navigate('/login');
        } else {

            isTokenValid(localStorage.getItem('token'))
                .then((response) => {
                    localStorage.setItem('tokenValid', response.data.status);
                    if (localStorage.getItem('tokenValid') === 'true') {

                        getCart(localStorage.getItem('userId')).then((response) => {
                            console.log(response)
                            setCartData(response);
                            setCartAmount(response.totalPrice);
                        });

                        getUserByUserName(localStorage.getItem('userEmail')).then((response) => {
                            if (response) {
                                setProcessing(false)
                                setAddress(response.data.address);
                            }
                        })
                    }
                    else {
                        setProcessing(false)
                        clearBrowser();
                        navigate('/login');
                    }
                })
        }
    }, [navigate, location.state, pathname]);

    if (cartData) {
        localStorage.setItem('cartItem', cartData.cartitems.length);
    }

    return (
        <>
            {processing && <LoadingOverlay />}
            <Container style={{ height: "auto", marginTop: '10px', position: 'relative', overflow: 'hidden', marginBottom: '20px' }}>
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

                                                <div style={{ width: '83px', height: '40px', marginLeft: '30px' }}>
                                                    <InputGroup size="sm" style={{}}>
                                                        <Button variant="outline-secondary" onClick={() => handleDecrement(item.cartItemId, localStorage.getItem('userId'), item.numOfItem)} >-</Button>
                                                        <FormControl style={{ width: '32px', textAlign: 'center' }} type="text" value={item.numOfItem} disabled={processing} readOnly />
                                                        <Button variant="outline-secondary" onClick={() => handleIncrement(item.cartItemId, localStorage.getItem('userId'), item.numOfItem)}>+</Button>
                                                    </InputGroup>
                                                </div>
                                                <p style={{ marginLeft: '30px' }}>₹{item.specialPrice * item.numOfItem}</p>
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
                                                <p style={{ marginLeft: '200px' }}>₹{cartData.totalPrice + cartData.totalDiscount}</p>

                                            </div>
                                            <div className="price">
                                                <h6>Discount</h6>
                                                <p style={{ marginLeft: '173px', color: '#148046' }}>₹-{cartData.totalDiscount}</p>
                                            </div>
                                            <div className="price">
                                                <h6>Delivery Charge</h6>
                                                <p style={{ marginLeft: '123px' }}>₹{cartData.deliveryFee}</p>
                                            </div>
                                        </Row>
                                    </div>

                                    <div className="card-footer">
                                        <h6>Total Price</h6>
                                        <h6 style={{ marginLeft: '180px' }}>₹{cartData.totalPrice}</h6>
                                    </div>
                                </div>

                            )}
                            <button className="checkout-button" onClick={() => checkout(cartData.totalPrice)}>Checkout</button>
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
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: 'rgb(220, 223, 225)' }}>
                    <Modal.Title>Select your address</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgb(220, 223, 225)' }}>
                    {address && (
                        <div>
                            {address.map((val, index) => (
                                <div
                                    className="address-box"
                                    key={index}
                                    style={{ display: 'flex', alignItems: 'center', backgroundColor: selectedAddress === val ? 'lightblue' : 'transparent' }}
                                >
                                    <button
                                        className="modal-address-button"
                                        style={{ textAlign: 'left', color: 'black', flexGrow: 1 }}
                                        onClick={() => handleAddressSelection(val.id)}
                                    >
                                        {capitalizeFirstLetter(val.address)}, {capitalizeFirstLetter(val.landMark)}, {val.pinCode}, {capitalizeFirstLetter(val.city)}, {capitalizeFirstLetter(val.state)}
                                    </button>
                                    <Form.Check
                                        type="radio"
                                        aria-label={`radio ${index + 1}`}
                                        style={{ marginLeft: 'auto', marginRight: '20px', borderColor: 'black' }}
                                        name="addressRadio"
                                        value={val}
                                        checked={selectedAddress === val.id}
                                        onChange={() => handleAddressSelection(val.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <Link className="modal-address-button" to="/address">+ Add new address</Link>
                </Modal.Body>
                <Modal.Footer>
                    <Container className="d-flex justify-content-center">
                        <Button variant="primary" onClick={() => handlePayment(selectedAddress, cartData.id)} className="modal-payment-button">
                            Proceed to payment
                        </Button>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Cart;
