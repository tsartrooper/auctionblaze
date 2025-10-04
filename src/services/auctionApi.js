import Auction from "../types/Auction";
import axios from "./axiosInstance"


export const AuctionApi ={

    async getAuctionsFiltered(filters){
        const res = await axios.get("/catalog/auctions-filtered");
        console.log(res);

        return res.data.content.map((item)=> new Auction(item));
    }
}