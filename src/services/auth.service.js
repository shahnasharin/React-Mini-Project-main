import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

const register = (username,email,password,mobile_number,date_of_birth) => 
    axios.post(
        API_URL+'signup/',{
            username,
            email,
            password,
            mobile_number,
            date_of_birth
        }
        );

const login = (email,password) => 
    axios.post(
        API_URL+'signin/',{
            email,
            password
        }
    ).then((response)=>{
        if(response.data.token){  
            localStorage.setItem('user',JSON.stringify(response.data));
        }
        return response.data;
    })



const logout = () => localStorage.removeItem('user');

export default {
    register,
    login,
    logout
}