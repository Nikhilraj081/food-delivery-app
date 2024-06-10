import React from "react";
import { myAxios } from "./Helper";



async function addItemToCart(data, quantity) {
    return await myAxios.post('/cart-service/cart/add/' + data.userId + '/' + data.id + '/quantity/' + quantity, null,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => response.data);
}

async function getCart(userId) {
    return await myAxios.get('/cart-service/cart/user/' + userId,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => response.data);
}

async function updateCart(itemId, userId, noOfItem) {
    return await myAxios.put('/cart-service/cart/update/cartItem/'+itemId+'/user/'+userId+'/'+noOfItem, null,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => response.data);
}

async function deleteCartItem(userId, itemId) {
    return await myAxios.delete('/cart-service/cart/delete/userId/'+userId+'/itemId/'+itemId,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => response.data);
}


async function updateCartItemLength(response) {
    if (response) {
        localStorage.setItem('cartItem', response.cartitems.length);
    }
};

export { addItemToCart, getCart, updateCart, deleteCartItem, updateCartItemLength };