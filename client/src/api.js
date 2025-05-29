import axios from "axios"

export const fetchRegister = async(input)=>{
    const {data} = await axios.post(`http://localhost:4000/auth/register`, input)
    return data;
}