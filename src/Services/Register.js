import { myAxios } from "./Helper";

async function register(formData) {
    return await myAxios.post('/auth-service/auth/register', formData)
        .then(response => response);
        
}

export {register};

