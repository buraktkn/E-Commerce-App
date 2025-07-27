import axios from "axios"

axios.interceptors.request.use(
    function (config) {
        const {origin} = new URL(config.url);
        const allowedOrigins = ('http://localhost:4000');
        const token = localStorage.getItem('access-token') 

        if(allowedOrigins.includes(origin)){
            config.headers.authorization = token
        }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
     
export const fetchRegister = async(input)=>{
    const {data} = await axios.post(`http://localhost:4000/auth/register`, input)
    return data;
}

export const fetchLogin = async(input)=>{ 
    const {data} = await axios.post(`http://localhost:4000/auth/login`, input)
    return data;
}


export const fetchMe = async(input)=>{
    const {data} = await axios.get(`http://localhost:4000/auth/me`)  
    return data;
}

export const fetchLogOut = async(input)=>{
    const {data} = await axios.post(`http://localhost:4000/auth/logout`, {refresh_token: localStorage.getItem('refresh-token')});
    return data;
}


export const postOrder = async(input)=>{
    const {data} = await axios.post(`http://localhost:4000/order`, input);
    return data;
}
 

export const fetchOrders = async()=>{
    const {data} = await axios.get(`http://localhost:4000/order`);
    return data;
}
 
