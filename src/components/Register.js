import React,{useState,useRef} from 'react';
import {useDispatch,useSelector} from 'react-redux';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import { register} from '../actions/auth';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email!
        </div>
      );
    }
  };
  
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  const vmobilenumber = (value) => {
    if(value.length < 10 || value.length > 10) {
      return (
        <div className="alert alert-danger" role="alert">
          Mobile number must be 10 digits.
        </div>
      );
    }
  };

  const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [successful, setSuccessful] = useState(false);
  
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
    const onChangeMobileNumber = (e) => {
      const mobileNumber = e.target.value;
      setMobileNumber(mobileNumber);
    };
    const onChangeDateOfBirth = (e) => {
      const dateOfBirth = e.target.value;
      setDateOfBirth(dateOfBirth);
    };
    
    
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleRegister = (e) => {
      e.preventDefault();
  
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(register(username, email, password))
          .then(() => {
            setSuccessful(true);
            console.log("registereythu")
          })
          .catch(() => {
            setSuccessful(false);
          });
      }
    };
    
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="number">Mobile number</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="mobileNumber"
                    value={mobileNumber}
                    onChange={onChangeMobileNumber}
                    validations={[required, vmobilenumber]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Date Of Birth</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="DateOfBirth"
                    value={dateOfBirth}
                    onChange={onChangeDateOfBirth}

                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
  
                <div className="form-group mt-3">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}
            {successful && (
              <div className="alert alert-success" role="alert">
                You have successfully registered!
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    );
  };
  
  export default Register;