import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../Css/Home.css';
import Slider from "./Slider";
import { Button, Container, Row, Modal, Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { getFoodItems, getFoodItemsByCategory } from "../Services/FoodItemsApi";
import { addItemToCart } from "../Services/Cart";
import { useNavigate } from "react-router-dom";
import { clearBrowser, isTokenValid } from "../Services/Login";
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from "../Services/StringConversion";
import LoadingOverlay from "./LoadingOverlay";
import { CartContext } from "./CartContext";


const CustomToast = ({ closeToast, cartCount, navigate }) => (
    <button className="toast-wrapper" onClick={()=> navigate('/cart')}>
        
            <p className="toast-message">{cartCount} Items added into cart &nbsp; &nbsp;&nbsp; View cart &gt;</p>
            <p></p>
            {/* <Link className="toast-button" to="/cart">View cart &gt;</Link> */}
            {/* <button className="toast-button d-flex justify-content-end" onClick={() => handleButtonClick(closeToast, navigate)}>View cart &gt; </button> */}
    </button>
);

const handleButtonClick = (closeToast, navigate) => {
    navigate('/cart');
    closeToast(); // Close the toast
};

const ItemsView = () => {
    const location = useLocation();
    const { pathname } = useLocation();
    const { cartCount, setCartCount } = useContext(CartContext);
    const {toastIdCount, setToastIdCount} = useContext(CartContext);
    const toastId = useRef(null);

    // Access the `menuItem` using optional chaining (`?.`)
    const menuItem = location.state.item;

    console.log(menuItem); // For debugging purposes (optional)

    const navigate = useNavigate();

    useEffect(() => {
        toast.dismiss(toastIdCount)
        window.scrollTo(0, 0);
        if (menuItem) {
            setProcessing(true)
            getFoodItemsByCategory(menuItem)
                .then((response) => {
                    console.log(response);
                    setItems(response);
                    setProcessing(false)
                })
                .catch((error) => {
                    setProcessing(false)
                    console.log(error);
                });
        }

    }, [menuItem, pathname]);

    useEffect(() => {
        if (cartCount === 0) {
            toast.dismiss(toastIdCount)
        }
        else {
            showToast();
        }

    }, [cartCount,toastIdCount]);

     //To display cart item count

    const showToast = () => {
        if(toastIdCount === null) {
            // Show the toast for the first time
            console.log("home page show if method" + toastIdCount)
            toastId.current = toast(<CustomToast  cartCount={cartCount} navigate={navigate} />, {
                autoClose: false, // Make the toast stay until closed manually
                closeButton: false,
                className: 'custom-toast'
            });
            setToastIdCount(toastId.current)
            console.log("toast Id........." + toastIdCount);
            console.log("toast current id "+ toastId.current);
            // localStorage.setItem('toastId', toastId);
        } else {
            console.log("home page show else method" + toastIdCount)
            
            // Update the existing toast
            toast.update(toastIdCount, {
                render: <CustomToast cartCount={cartCount} navigate={navigate} />,
                autoClose: false, // Make the toast stay until closed manually
                closeButton: false,
                className: 'custom-toast'
            });

            setToastIdCount(toastId.current);
            // localStorage.setItem('toastId', toastId.current);
            console.log("toast Id........." + toastIdCount);
            console.log("toast current id "+ toastId.current);
        }
    };

  
    //To check if auth token is valid

    isTokenValid(localStorage.getItem('token'))
        .then((response) => {
            localStorage.setItem('tokenValid', response.data.status);
            if (localStorage.getItem('tokenValid') !== 'true') {
                clearBrowser();
            }
        })
        .catch((error) => console.log(error));

    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedItem, setSelectedItem] = useState(null); // State for selected item
    const [selectedQuantity, setSelectedQuantity] = useState(null); // State for selected quantity
    const [processing, setProcessing] = useState(false);

    const addToCart = (itemId, userId) => {
        console.log("itemId " + itemId)
        console.log("userId " + userId)
        const selectedItem = {
            ...items.find(item => item.id === itemId),
            userId: userId,
            // Add more properties as needed
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
        setProcessing(true)
        if (selectedItem) {
            console.log("selected item itemId: " + (selectedItem.id || "N/A"));
            console.log("selected item userId: " + (selectedItem.userId || "N/A"));

            if (localStorage.getItem('login') !== 'true') {
                alert("You are not login, please login!")
                setProcessing(false)
                navigate('/login');
            } else {

                isTokenValid(localStorage.getItem('token'))
                    .then((response) => {

                        if (response.data.status === true) {
                            addItemToCart(selectedItem, selectedQuantity).then((response) => {
                                setProcessing(false)
                                setCartCount(response.cartitems.length);
                            }
                            ).catch((error) => {
                                setProcessing(false)
                                console.log(error)
                            });
                            
                        }
                        else {
                            setProcessing(false)
                            alert("You are not login, please login!")
                            clearBrowser();

                            navigate('/login');
                        }
                    })

            }
        } else {
            console.error("No item selected");
        }
        handleCloseModal(); // Close modal after adding to cart
    };

    return (

        <>
            {processing && <LoadingOverlay />}
            <Container style={{ padding: '10px' }} >
                <h4 className="heading" style={{ marginTop: '10px' }}>Food Items</h4>
                <Row className="card-container" style={{ paddingLeft: '10px' }}>
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
                                        className="custom-radio"
                                        aria-label={`radio ${index + 1}`}
                                        style={{ marginLeft: 'auto', marginRight: '20px', borderColor: 'black' }}
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
        </>
    );
};
export default ItemsView;
