import { useEffect } from "react";
import { AuctionApi } from "../services/auctionApi"


export default function useGetAuctionsFiltered( {filters, setAuctions} ){

    useEffect(() => {
        const fetchAuctions = async () => {
            const auctions = await AuctionApi.getAuctionsFiltered(filters); 
            setAuctions(auctions);
        };
        fetchAuctions();
    }, [filters, setAuctions]);

}