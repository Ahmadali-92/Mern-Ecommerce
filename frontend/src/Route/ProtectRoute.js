import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectRoute = (props) => {
    const {isAuthenticated}=props;
    if(!isAuthenticated){
     return   <Navigate to="/login"/>
    }
  return (
    <div>
      
    </div>
  )
}

export default ProtectRoute
