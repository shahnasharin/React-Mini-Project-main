import React,{useRef} from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

const Profile = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser)
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  
  return (
    <div className="container">
      <header className="jumbotron">
        <img style={{
          width:'200px',
          height:'200px',
          borderRadius:'50%',
          objectFit:'cover'

        }}  
        src={currentUser.profile_picture} alt="profile" 
        />
        {console.log(currentUser.profile_picture)}

        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Your Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>User ID : </strong> {currentUser.user_id}
      </p>
      <p>
        <strong>Your Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
        <h4>Change Profile Picture here</h4>
    </div>
  );
};

export default Profile;