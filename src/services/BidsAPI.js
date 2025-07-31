
import Bid from "../types/Bid";
import axios from "./axiosInstance";

export const bidsAPI={

    async getUserBids(){
        const res = await axios.get("/bids");

        console.log("data:",res.data);
        
        return res.data.map(bid=> new Bid(bid));
    }    
    
}