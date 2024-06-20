import React, { useEffect, useState } from "react";
import { myAxios } from "./Helper";
import { BASE_URL } from "./Helper";


async function getFoodImage(imageId) {
    try {
      const response = await fetch(BASE_URL + '/restaurants-service/items/image/' + imageId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers such as authorization tokens
        },
      });
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }
        

export default getFoodImage;