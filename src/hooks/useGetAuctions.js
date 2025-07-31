
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "../services/axiosInstance";
import Auction from "../types/Auction";


const fetchAuctions = async () =>{
    const res = await axios.get("/catalog/all");

    console.log("auctions",res.data.content);

    return  {res: res.data.content.map((item)=>new Auction(item)), pages: res.data.totalPages};
}

export function useGetAuctions(){
    return useQuery({
        queryKey: ["auctions"],
        queryFn: fetchAuctions
    });
}