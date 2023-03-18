import axios from "axios";
import auth_header from "./auth-header";
const imageHeader = ()=> {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.token) {
           return { 
                Authorization: user.token,
                'content-Type': 'multipart/form-data'
         };
        }else{
            return {};
        }        
    }
export const API_URL = "http://localhost:8000/api/";

const getPublicContent = () => axios.get(API_URL+'all');

const getUserBoard = () => axios.get(API_URL+'profile/',{headers: auth_header()});

const getAdminBoard = () => axios.get(API_URL+'admin/',{headers: auth_header()+{}});

const imageUpload = (file) => axios.put(API_URL+'upload/', file, {headers: imageHeader()});



export default {
        getPublicContent,
        getAdminBoard,
        getUserBoard,
        imageUpload,

};