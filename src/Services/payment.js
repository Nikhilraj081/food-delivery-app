import { PAYMENT_KEY, myAxios } from "./Helper";
import logo from '../Icon/delivery-man.png';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { deleteAllCartItem } from "./Cart";
import { deleteOrder } from "./Order";

async function proceedPayment(addressId, amount, userId, cartId, setProcessing, navigate, setCartCount) {

    setProcessing(true)
    return await myAxios.post('/order-service/create_order', { "amount": amount, "addressId": addressId, "userId": userId }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => {

        if (response.status === 200) {
            setProcessing(false)
            let options =
            {
                key: PAYMENT_KEY,
                amount: response.data.amount,
                currency: 'INR',
                name: 'Food Delivery App',
                image: { logo },
                order_id: response.data.id,

                handler: function (response) {
                    setProcessing(true)
                    updateOrder(response.razorpay_order_id, response.razorpay_payment_id, "paid", "received").then((response) => {
                        if (response) {
                            deleteAllCartItem(cartId).then((response) => {
                                setProcessing(false)
                                if (response) {
                                    setCartCount(0);
                                }
                                Swal.fire({
                                    title: 'Payment Successful',
                                    text: 'Your payment was successful. You will be redirected to the order page.',
                                    icon: 'success',
                                    confirmButtonText: 'Go to Orders',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        navigate('/order');
                                    }
                                }).catch((error) => {
                                    toast.error("Something went wrong!")
                                    console.log(error);
                                });
                            })
                        }
                    }).catch((error) => {
                        setProcessing(false)
                        toast.error("Something went wrong!")
                        console.log(error)
                    }
                    )
                },
                modal: {
                    ondismiss: function () {

                        setProcessing(false);
                        updateOrder(options.order_id, "null", "failed", "order not placed").then((response) => {
                            Swal.fire({
                                title: 'Payment Failed',
                                text: 'Your payment was not successful. Please try again.',
                                icon: 'error',
                                confirmButtonText: 'Go to Cart',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/cart');
                                }
                            });

                        }).catch((error) => {
                            setProcessing(false)
                            toast.error("Something went wrong!")
                            console.log(error)
                        }
                        )
                    },
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            var rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {

                if (response) {
                    setProcessing(true)
                    updateOrder(options.order_id, "null", "failed", "order not placed").then((response) => {

                        if (response) {
                            setProcessing(false)
                            Swal.fire({
                                title: 'Payment Failed',
                                text: 'Oops! Something went wrong with your payment. Please try again later.',
                                icon: 'error',
                                confirmButtonText: 'Go to Cart',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/cart');
                                }
                            });
                        }
                    }).catch((error) => {
                        setProcessing(false)
                        toast.error("Something went wrong!")
                        console.log(error)
                    }
                    )
                }
            });
            rzp.open();
        }
        return response;
    }).catch((error) => {
        setProcessing(false)
        if (error.response.data.message) {
            toast.error(error.response.data.message);
        }
        else {
            toast.error("Something went wrong!");
            console.log(error)
        }

    }
    );
}

async function updateOrder(orderId, paymentId, paymentStatus, orderStatus) {
    return await myAxios.put('/order-service/order/update_order/' + orderId + '/payment/' + paymentId + '/paymentStatus/' + paymentStatus + '/orderStatus/' + orderStatus, null, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => response).catch((error) => console.log(error));
}

export { proceedPayment, updateOrder };