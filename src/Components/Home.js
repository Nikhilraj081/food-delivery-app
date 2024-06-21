import React, { useContext, useEffect, useRef, useState } from "react";
import '../Css/Home.css';
import '../Css/CustomToast.css';
import Slider from "./Slider";
import { Button, Container, Row, Modal, Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { getFoodItems } from "../Services/FoodItemsApi";
import { addItemToCart, getCart } from "../Services/Cart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearBrowser, isTokenValid } from "../Services/Login";
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from "../Services/StringConversion";
import LoadingOverlay from "./LoadingOverlay";
import { CartContext } from "./CartContext";


const Home = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { cartCount, setCartCount } = useContext(CartContext);
    const { toastIdCount, setToastIdCount } = useContext(CartContext);

    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedItem, setSelectedItem] = useState(null); // State for selected item
    const [selectedQuantity, setSelectedQuantity] = useState(null); // State for selected quantity
    const [processing, setProcessing] = useState(false);
    const [content, setContent] = useState("Initial message");
    const toastId = useRef(null);

    useEffect(() => {
        toast.dismiss(toastIdCount)
        window.scrollTo(0, 0);
        setProcessing(true);
        getFoodItems()
            .then((response) => {
                setItems(response);
                setProcessing(false);
            })
            .catch((error) => {
                console.log(error);
                setProcessing(false);
            });

        getCart(localStorage.getItem('userId')).then((response) => {
            setCartCount(response.cartitems.length);
        }).catch((error) => {
            setProcessing(false);
            console.log(error);
        }

        );
    }, [pathname]);

    // To check if auth token is valid
    useEffect(() => {
        isTokenValid(localStorage.getItem('token'))
            .then((response) => {
                localStorage.setItem('tokenValid', response.data.status);
                if (localStorage.getItem('tokenValid') !== 'true') {
                    clearBrowser();
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const addToCart = (itemId, userId) => {
        const selectedItem = {
            ...items.find(item => item.id === itemId),
            userId: userId,
        };
        if (selectedItem) {
            setSelectedItem(selectedItem);
            setShowModal(true);
        } else {
            console.error("Item not found");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null); // Reset selected item when modal is closed
        setSelectedQuantity(null); // Reset selected quantity when modal is closed
    };

    const handleAddToCart = () => {
        setProcessing(true);
        if (selectedItem) {
            if (localStorage.getItem('login') !== 'true') {
                alert("You are not login, please login!");
                navigate('/login');
            } else {
                isTokenValid(localStorage.getItem('token'))
                    .then((response) => {
                        if (response.data.status === true) {
                            addItemToCart(selectedItem, selectedQuantity).then((response) => {
                                if (response) {
                                    setCartCount(response.cartitems.length);
                                    setProcessing(false);
                                }
                            }).catch((error) => {
                                setProcessing(false);
                                console.log(error);
                            });
                        } else {
                            alert("You are not login, please login!");
                            clearBrowser();
                            navigate('/login');
                        }
                    });
            }
        } else {
            console.error("No item selected");
        }
        handleCloseModal(); // Close modal after adding to cart
    };

    return (
        <>
            {processing && <LoadingOverlay />}
            <Slider />
            <Container style={{ padding: '10px' }} >
                <h4 className="heading" style={{ marginTop: '10px' }}>Food Items</h4>
                <Row className="card-container" style={{ paddingLeft: '10px' }}>
                    {console.log(items.ty)}
                    {items.map((item) => (
                        <Card key={item.id} className="card-bodys border-0 shadow-none">
                            <Card.Body>
                                <Card.Img src={'data:image/jpeg;base64,' + item.image} className="card-image" />
                                <h5>{capitalizeFirstLetter(item.name)}</h5>
                                <h6 style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'rgb(158, 155, 155)' }}>₹{item.variant[0].price}</h6>
                                <h6>₹{item.variant[0].specialPrice}</h6>
                                <h6 style={{ color: 'green' }}>Discount ₹{item.discount}</h6>
                                <button className="card-button" onClick={() => addToCart(item.id, localStorage.getItem('userId') || '')}> Add to cart</button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
            {/* Modal for additional input */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: 'rgb(220, 223, 225)' }}>
                    <Modal.Title>Customise your meal</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgb(220, 223, 225)' }}>
                    {/* Render selected item's information here */}
                    {selectedItem && (
                        <div>
                            <h5>{selectedItem.name}</h5>
                            {selectedItem.variant.map((val, index) => (
                                <div key={index} className="varient-tag">
                                    <div className="item_quantity"> <h6>{val.quantity}</h6> </div>
                                    <h6 style={{ marginLeft: '123px' }}>₹{val.specialPrice}</h6>
                                    <Form.Check
                                        type="radio"
                                        aria-label={`radio ${index + 1}`}
                                        className="custom-radio"
                                        style={{ marginLeft: 'auto', marginRight: '20px' }}
                                        name="variantRadio" // Ensure all radio buttons have the same name
                                        value={val.quantity} // Value of the radio button
                                        checked={selectedQuantity === val.quantity} // Check if this radio button is selected
                                        onChange={() => setSelectedQuantity(val.quantity)} // Update selected quantity
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={cartCount && cartCount > 0 ? { display: 'block' }: { display: 'none' }}>
                <div className="mod-wrapper">
                    <button className="t-wrapper" onClick={() => navigate('/cart')}>
                        <p className="toast-message">{cartCount} Items added into cart &nbsp; &nbsp;&nbsp; View cart &gt;</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
