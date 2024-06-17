import React from "react";
import { myAxios } from "./Helper";

async function getUserByUserName(userName) {
  return await myAxios.get('/auth-service/user/userName/' + userName,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
    .then((response) => response);
}

async function getUserAddress(userId, addressId) {
  return await myAxios.get('/auth-service/user/id/' + userId + '/addess/' + addressId,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
    .then((response) => response);
}

async function saveAddress(addressData,userId) {
  return await myAxios.post('/auth-service/user/id/'+userId+'/add/address',addressData,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).then((response) => response);
}

async function deleteAddress(userId, addressId) {
  return await myAxios.delete('/auth-service/user/'+ userId + '/address/'+ addressId+'/delete' ,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
    .then((response) => response);
}

async function updateUser(userId, user) {
  return await myAxios.put('/auth-service/user/'+userId+'/update',user,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).then((response) => response);
}


export { getUserByUserName, getUserAddress, saveAddress, deleteAddress, updateUser};