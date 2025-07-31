import { Gavel, MarsStroke, User } from "lucide-react";
import { formatDateTime } from "../features/Auctions/utils/FormatDateTime";



export default function BidCard({bid, highest, userBid=false}){
    return <div className= {`p-4 rounded-lg border-l-4
                ${highest? 'bg-blue-50 border-blue-500'
                    : 'bg-gray-50 border-gray-500'}`}>
                <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {!userBid && <User className="w-4 h-4 text-gray-500" /> }
                    {userBid && <Gavel className="w-4 h-4 text-gray-500" /> }
                    <span className="font-medium text-gray-800">
                        {!userBid && (bid.bidderName || `User ${bid.bidderId}`)}
                        {userBid && bid.auctionListingName}
                    </span>
                    {highest && (
                        <span className="bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            Highest
                        </span>
                    )}
                </div>
                <div className="text-right">
                    <div className="font-bold text-gray-900">
                        ₹{bid.amount?.toLocaleString('en-IN')}
                    </div>
                    {bid.timeStamp && (
                        <div className="text-xs text-gray-500">
                            {formatDateTime(bid.timeStamp)}
                        </div>
                    )}
                </div>
            </div>
            </div>
}