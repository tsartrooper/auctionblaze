
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../services/axiosInstance"
import { toast } from "sonner";

const postBid = async (bidData) =>{

    try{
        await axios.post("/bids", bidData);
        toast.success("Bid has been made.");
    }
    catch(err){
        toast.error("Bid invalid.")
        // toast.success("Bid has been made.");
    }

    return;
}

export function useMakeBid(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postBid,
        onSuccess: (data, variables) =>{
            queryClient.invalidateQueries({ 
                queryKey : [`auctions-${variables.auctionListingID}`,`auctions`]
            });
        },
        onError: (error) =>{
            console.error('Bid submission failed: ',error);
        }
    });
}