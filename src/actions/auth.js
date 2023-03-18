import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types'

import AuthService from '../services/auth.service'

// Register function
export const register = (username, password,email,mobile_number,date_of_birth) =>(dispatch)=>{
    return AuthService.register(username, password,email,mobile_number,date_of_birth).then(
        (response)=>{
            dispatch({
                type:REGISTER_SUCCESS
            });

            dispatch({
                type:SET_MESSAGE,
                payload:response.data.message
            })
            return Promise.resolve()
        },
        (error) =>{
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({type:REGISTER_FAIL});

            dispatch({
                type:SET_MESSAGE,
                payload:message
            });
            return Promise.reject();
        }
    )};

// Login function

export const login = (email, password) =>(dispatch)=>{
    return AuthService.login(email, password).then(
        (data) =>{
            dispatch({
                type:LOGIN_FAIL,
                payload:{user:data}
            });
            return Promise.resolve();
        },(error)=>{
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({
                type:LOGIN_FAIL,
            });

            dispatch({
                typeof:SET_MESSAGE,
                payload:message
            });
            return Promise.reject();
        }
    )
 };

 export const logout = () =>(dispatch)=>{
        AuthService.logout();
        
        dispatch({
            typeof:LOGOUT
        });

};
