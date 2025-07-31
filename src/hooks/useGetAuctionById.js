import { useQuery } from "@tanstack/react-query";
import axios from "../services/axiosInstance"
import Auction from "../types/Auction";



const getAuctionById = async (auctionId) =>{
    const res = await axios.get("/auctions/auction",
        {params: {auctionId}}
    );

    console.log("auction data: ",res.data)
    
    return new Auction(res.data);
}

export function useGetAuctionById({ auctionId }){
    return useQuery({
        queryKey: [`auction-${auctionId}`],
        queryFn: ()=>getAuctionById(auctionId),
    });
}