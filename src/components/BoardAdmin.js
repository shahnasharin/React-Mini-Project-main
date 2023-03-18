import React, { useState,useEffect, createContext } from 'react'
import AdminServices from '../services/admin.service'
import Table from './AdminTable'
export const reloadContext = createContext('')
function BoardAdmin() {
const [reload,SetReload] = useState(false)
const [query,setQuery] = useState('');
const [userdata,setUserdata] = useState([]);


useEffect(()=>{
   AdminServices.adminSearch(query).then((response)=>{
    setUserdata(response.data)
   }) 
},[query,reload])
  return (

    <reloadContext.Provider value={{reload,SetReload}}>
    <div className='d-flex justify-content-center '>
    <div className=""><h1>Admin Dashboard</h1> 

  <div className="form-outline">
    <input type="search" id="form1" className="form-control" placeholder='Search Users..' onChange={(e)=>{setQuery(e.target.value)}} />
  </div>
  <Table data={userdata} />

</div>
    

    </div>
    </reloadContext.Provider>
  )
}

export default BoardAdmin