import React from "react";
import { myAxios } from "./Helper";



async function getUserByUserName(userName)
{
    return await myAxios.get('/auth-service/user/userName/'+userName,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    .then((response ) => response);  
}
export default getUserByUserName;