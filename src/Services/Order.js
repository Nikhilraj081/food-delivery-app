import { myAxios } from "./Helper";

async function getOrderDetails(userId) {

    return await myAxios.get('/order-service/order/user/' + userId,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      ).then((response) => response);
 };

async function deleteOrder(orderId) {

    return await myAxios.delete('/order-service/order/delete/' + orderId,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      ).then((response) => response);
 };

 export {getOrderDetails, deleteOrder};