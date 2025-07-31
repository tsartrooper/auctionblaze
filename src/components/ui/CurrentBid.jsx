import { TrendingUp } from "lucide-react";
import { getAuctionStats } from "../../utils/getAuctionStats";
import { formatCurrency } from "../../utils/formatCurrency";



export default function CurrentBid({ auction, gradient }){

    const priceStats = getAuctionStats(auction);
    return(
        <div className={`bg-gradient-to-r ${gradient} rounded-xl p-4 space-y-2`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Current Bid</span>
                {priceStats && priceStats.percentageIncrease > 0 && (
                <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-medium">+{priceStats.percentageIncrease}%</span>
                </div>
                )}
            </div>
            <div className="flex items-end justify-between">
                <span className="text-xl font-bold text-gray-900">
                {formatCurrency(auction.currentHighestBid)}
                </span>
                {priceStats && (
                <span className="text-xs text-gray-600">
                    {priceStats.bidCount} bid{priceStats.bidCount !== 1 ? 's' : ''}
                </span>
                )}
            </div>
        </div>
    )
}