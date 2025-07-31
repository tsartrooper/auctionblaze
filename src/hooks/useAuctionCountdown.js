import { useEffect, useState } from "react";



export default function useAuctionCountDown({ auction, setTimeLeft }){
    useEffect(()=>{

        if (!auction?.startTime || !auction?.endTime || !auction?.status) return;
        
        const calculateTimeLeft = () => { 
            const now = new Date();
            const endTime = new Date(auction.endTime);
            const startTime = new Date(auction.startTime);

            let targetTime;

            if(auction.status==="SCHEDULED"){
                targetTime = startTime;
            }
            else if(auction.status==="ACTIVE"){
                targetTime = endTime;
            }
            else{
                setTimeLeft("Auction Ended");
                return;
            }

            const difference = targetTime-now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                if (days > 0) {
                    setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                } else if (hours > 0) {
                    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                } else {
                    setTimeLeft(`${minutes}m ${seconds}s`);
                }
            } else {
                setTimeLeft(auction.status === 'SCHEDULED' ? 'Starting now!' : 'Auction ended');
            }
        }   

        calculateTimeLeft();

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [auction, setTimeLeft])

    return;
}