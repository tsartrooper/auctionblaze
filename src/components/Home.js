import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home(){
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token || token.trim() === '') {
            navigate('/login');
        }
        else{
            navigate('/catalog/all')
        }
    }, [navigate]);
}