import React from "react";
import { myAxios } from "./Helper";



async function login(formData)
{
    return await myAxios.post('/auth-service/auth/login', formData)
    .then((response ) => response);  
}

async function isTokenValid(token)
{
    return await myAxios.post('/auth-service/auth/token', {"token":token})
    .then((response ) => response);  
}

async function clearBrowser()
{
    localStorage.clear();
    window.location.reload();
}


export {login,isTokenValid,clearBrowser};