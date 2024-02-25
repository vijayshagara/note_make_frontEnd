import axios, { AxiosInstance } from "axios";



//Creating an instance
const http:AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json'
    }
});



export const setAuthHearders = ({accessToken}:{accessToken:string})=>{
 if(accessToken){
    http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
 }else{

 }
}

export default http