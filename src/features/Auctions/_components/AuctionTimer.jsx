import { Clock } from "lucide-react";
import { useState } from "react";
import useAuctionCountDown from "../../../hooks/useAuctionCountdown";



export default function AuctionTimer({ auction }){

    const [timeLeft, setTimeLeft] = useState("");
    const status=auction.status;

    useAuctionCountDown({ auction, setTimeLeft });

    return (
        <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">
                    {status === 'SCHEDULED' ? 'Starts in' : 
                        status === 'ACTIVE' ? 'Ends in' : 'Time'}
                </span>
            </div>
            <div className={`text-2xl font-bold ${
                status === 'ACTIVE' ? 'text-red-600' : 'text-blue-600'
            }`}>
                {timeLeft}
            </div>
        </div>
    )
}