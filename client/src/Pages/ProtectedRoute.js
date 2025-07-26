import { useAuth } from "../Contexts/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes({ component: Component, admin, ...rest }) {
  const { loggedIn, user } = useAuth();

      if (admin && user?.role !== 'admin'){
        return <Navigate to={'/'} replace />
      }
      
      if(!loggedIn){
        return <Navigate to={'/'} replace />;
      }

      return <Outlet/>
      }  


//return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
