import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


export default function ProtectedRoute({children}){

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isAuthenticated = token && token.trim() !== "" && isTokenValid(token);

    useEffect(()=>{
        
        if(!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate])

    
    return isAuthenticated? children : null;
}

function isTokenValid(token){
    try{
        const decoded = jwtDecode(token);
        const currentTime = Date.now()/1000;

        return decoded.exp > currentTime;
    }
    catch(error){
        console.log("Invalid token", error);
        return false;
    }
}