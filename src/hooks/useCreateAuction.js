import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../services/axiosInstance"



const postAuction = async (auctionData) =>{
    const res = await axios.post("/auctions", auctionData);

    return res.data;
}


export function useCreateAuction(){

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postAuction,
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey : ["auctions"]});
        }
    });
}