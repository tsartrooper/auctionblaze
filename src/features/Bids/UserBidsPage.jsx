import { useEffect, useState } from "react";
import BidCard from "../../components/BidCard";
import { bidsAPI } from "../../services/BidsAPI";
import PageHeader from "../../components/globals/PageHeader";
import LoadingAuctionSkeleton from "../../components/globals/LoadingAuctionSkeleton";
import LoadingBidSkeleton from "./components/LoadingBidSkeleton";




export default function UserBidsPage(){

    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() =>{
        const fetchBids = async()=>{
            try{
                setLoading(true);
                const userBids = await bidsAPI.getUserBids();
                setBids(userBids);
            }catch(err){
                setError("Failed to load bids");
                console.log("error fetching bids: ",err);
            }
            finally{
                setLoading(false);
            }
        }

        fetchBids();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return <div className="max-md:mt-16 pb-5 border rounded-md md:h-[calc(100vh-32px)] mx-auto container md:overflow-y-scroll">
        <PageHeader header={"Bids"} />
        { loading? <LoadingBidSkeleton /> : <div className="scroll-smooth gap-6 grid p-4">               
                {bids.map((bid, index) => {
                    return <div className="p-3"><BidCard bid={bid} highest={false} userBid={true} /></div>
                })}
            </div>
        }
    </div>
}