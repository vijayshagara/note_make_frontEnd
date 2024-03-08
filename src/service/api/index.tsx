import axios, { AxiosInstance } from "axios";

let baseApiUrl = '/api';

if (import.meta.env.VITE_BASE_URL) {  
    baseApiUrl = import.meta.env.VITE_BASE_URL
}

//Creating an instance
const http:AxiosInstance = axios.create({
    baseURL: baseApiUrl,
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