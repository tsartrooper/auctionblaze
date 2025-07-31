import { useQuery } from "@tanstack/react-query";
import axios from "../services/axiosInstance";
import User from "../types/User";

const fetchUser = async ()=>{
    const res = await axios.get("/users/profile");

    console.log("user data: ",res);

    return new User(res.data);
}

export default function useGetUser(){
    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUser
    });
}
