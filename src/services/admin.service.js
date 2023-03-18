import axios from "axios";
import auth_header from "./auth-header";

import { API_URL } from "./user.service";


const adminSearch =(query)=> axios.get(API_URL+`admin?search=${query}`,{headers:auth_header()});
// const adminAll  =()=>axios.get(API_URL+'admin',{headers:auth_header()});
const adminDelete =(username)=> axios.delete(API_URL+`admin/?username=${username}`,{headers:auth_header()});
export default {
    adminSearch,
    adminDelete
}