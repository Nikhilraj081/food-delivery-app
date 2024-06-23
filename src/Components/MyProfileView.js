import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../Css/MyProfile.css';
import { deleteAddress, getUserByUserName, updateUser } from '../Services/User';
import { capitalizeFirstLetter } from '../Services/StringConversion';
import { toast } from 'react-toastify';
import { clearBrowser, isTokenValid } from '../Services/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingOverlay from "./LoadingOverlay";

const MyProfilePage = () => {
    const [processing, setProcessing] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [editProfile, setEditProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNo: "",
        address: []
    });

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

                        const fetchData = async () => {
                            getUserByUserName(localStorage.getItem('userEmail')).then((response) => {
                                setProfileData(response.data);
                                setProcessing(false)
                            }).catch((error) => 
                                {
                                    setProcessing(false);
                                    console.log(error);
                                }
                               
                            ).finally();
                        };
                        fetchData();

                    }
                    else {
                        setProcessing(false)
                        clearBrowser();
                        navigate('/login');
                    }
                })
        }
    }, [pathname]);

    const handleEditProfile = () => setEditProfile(!editProfile);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setEditProfile(false);

        updateUser(localStorage.getItem('userId'), profileData).then((response) => {
            toast.success("Profile updated successfully!");
            setProfileData(response.data);
            if (localStorage.getItem('userEmail') !== profileData.emailId) {
                localStorage.clear()
                toast.success("You changed email id, please login again with new email id");
                navigate('/login')
            }

        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message);
        }
        );

    };

    const handleDelete = (userId, addressId) => {
        deleteAddress(userId, addressId).then((response) => {
            if (response) {
                getUserByUserName(localStorage.getItem('userEmail')).then((response) => {
                    setProfileData(response.data);
                    toast.success("One address deleted");
                }).catch((error) => console.log(error)).finally();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            {processing && <LoadingOverlay />}
            <div className='profile-wrapper'>
                <Container className="my-profile-page mt-5">
                    <Row>
                        <Col md={3}>
                            <div className="sidebar">
                                <ul>
                                    <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>My Profile</li>
                                    <li className={activeTab === 'address' ? 'active' : ''} onClick={() => setActiveTab('address')}>Address</li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={9}>
                            <div className="content">
                                {activeTab === 'profile' && (
                                    <div>
                                        <h2>My Profile</h2>
                                        <Form onSubmit={handleSaveProfile}>
                                            <Form.Group controlId="formFirstName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={profileData.firstName}
                                                    onChange={handleProfileChange}
                                                    readOnly={!editProfile}
                                                    className={editProfile ? 'edit-mode input-field' : 'read-mode input-field'}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formLastName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={profileData.lastName}
                                                    onChange={handleProfileChange}
                                                    readOnly={!editProfile}
                                                    className={editProfile ? 'edit-mode input-field' : 'read-mode input-field'}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formEmailId">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="emailId"
                                                    value={profileData.emailId}
                                                    onChange={handleProfileChange}
                                                    readOnly={!editProfile}
                                                    className={editProfile ? 'edit-mode input-field' : 'read-mode input-field'}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formMobileNo">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="mobileNo"
                                                    value={profileData.mobileNo}
                                                    onChange={handleProfileChange}
                                                    readOnly={!editProfile}
                                                    className={editProfile ? 'edit-mode input-field' : 'read-mode input-field'}
                                                />
                                            </Form.Group>
                                            {editProfile ? (
                                                <>
                                                    <Button className='edit-button' variant="primary" type="submit" >Save</Button>
                                                    <Button variant="secondary" style={{ marginLeft: '20px' }} onClick={handleEditProfile} className="ml-2 edit-button">Cancel</Button>
                                                </>
                                            ) : (
                                                <Button variant="primary edit-button" onClick={handleEditProfile}>Edit</Button>
                                            )}
                                        </Form>
                                    </div>
                                )}
                                {activeTab === 'address' && (
                                    profileData.address.length > 0 ? (
                                        profileData.address.map((address, index) => (
                                            <div key={index} className='address-wrapper' style={{ display: 'flex' }}>
                                                <p>{capitalizeFirstLetter(address.address)}, {capitalizeFirstLetter(address.landMark)}, {address.pinCode}, {capitalizeFirstLetter(address.city)}, {capitalizeFirstLetter(address.state)} </p>
                                                <button className='address-button' onClick={() => handleDelete(localStorage.getItem('userId'), address.id)}>Delete</button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="display-message">
                                            <div className="message-content">
                                                <p>There are no addrees</p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    );
};

export default MyProfilePage;
