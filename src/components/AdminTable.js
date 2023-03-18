import React,{useEffect,useState,useContext} from "react";
import AdminService from "../services/admin.service";
import { Navigate } from 'react-router-dom';
import { reloadContext } from "./BoardAdmin";
const Table = ({ data,}) => { 
  const [username,setUsername]=useState('')
  const {reload,SetReload} = useContext(reloadContext)
useEffect(()=>{
  console.log(username)
},[username])
    return (
        <>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date Of Birth</th>
            <th>Joined Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {data.map((item) => (
            <>
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.mobile_number}</td>
              <td>{item.date_of_birth}</td>
              <td>{item.date_joined.slice(0,10)}</td>
              <td><button >Edit</button></td>     
              <td><button onClick={()=>{

                AdminService.adminDelete(item.username).then((response)=>{
                    console.log(response);
                    alert(`${item.username} deleted!`)
                    SetReload(reload=>!reload)
                    setUsername(item.username)
                }).catch((error)=>{
                    console.log(error);
                    alert(`${item.username} not deleted!`)
                }).finally(()=><Navigate to='/admin'/>)
            
              }}>Delete</button></td>  
            </tr>

            </>
          ))}
        </tbody>
      </table>
      </>
    );
  };
  
  export default Table;