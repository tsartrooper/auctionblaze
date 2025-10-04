import React, { useState } from 'react';

import Bid from '../../../types/Bid';
import Form from '../../../components/ui/Form';
import { Gavel, Loader, Clock, Tag, User, DollarSign } from 'lucide-react';
import { useMakeBid } from '../../../hooks/useMakeBid';
import { toast } from "sonner";
import AuctionTimer from './AuctionTimer';
import useAuctionCountDown from '../../../hooks/useAuctionCountdown';
import CurrentBid from '../../../components/ui/CurrentBid';
import { getStatusConfig } from '../../../utils/getStatusConfig';
import QuickInfo from '../../../components/ui/QuickInfo';
import BidCard from '../../../components/BidCard';
import { formatCurrency } from '../../../utils/formatCurrency';

export default function AuctionDetail({ auction }) {
    console.log("endTime:", auction.endTime);
    console.log("startTime:", auction.startTime);

    const [bidAmount, setBidAmount] = useState("");

    
    const sortedBids = auction.bids ? [...auction.bids].sort((a, b) => b.amount - a.amount) : [];
    const { mutate: makeBid, isLoading, isError } = useMakeBid();

    const handleBidSubmit = async (data) => {
        const amount = parseFloat(data.amount || bidAmount);
        
        if (!amount || isNaN(amount) || amount <= auction.currentHighestBid) {
            toast.error("Please enter a valid bid amount higher than current highest bid");
            return;
        }
        
        const bidData = {
            ...data,
            amount: amount,
            auctionListingId: auction.id
        };
        
        await makeBid(bidData);
        setBidAmount("");
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'text-green-600 bg-green-50 border-green-200';
            case 'CLOSED': return 'text-red-600 bg-red-50 border-red-200';
            case 'PENDING': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {auction.picture && (
                        <div className="relative group">
                            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src={auction.picture}
                                    alt={auction.itemName}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            {/* Status Badge Overlay */}
                            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(auction.status)}`}>
                                {auction.status}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{auction.itemName}</h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <QuickInfo>
                                <Tag className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Category</p>
                                        <p className="font-medium text-gray-900">{auction.category}</p>
                                    </div>
                            </QuickInfo>
                            
                            <QuickInfo>
                                <DollarSign className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Starting Price</p>
                                    <p className="font-medium text-gray-900">{formatCurrency(auction.startingPrice)}</p>
                                </div>
                            </QuickInfo>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{auction.description}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Timer */}
                    {auction.status !== "CLOSED" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <AuctionTimer auction={auction} />
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                        <CurrentBid auction={auction} gradient={()=>{getStatusConfig(auction.status)}} />
                    </div>

                    {auction.status === "ACTIVE" ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Place Your Bid</h3>
                            <Form onSubmit={handleBidSubmit}>
                                <Form.Field>
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        Bid Amount (min: {formatCurrency(auction.currentHighestBid + 1)})
                                    </Form.Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                                        <Form.Input 
                                            type="number" 
                                            placeholder={auction.currentHighestBid + 1}
                                            name="amount" 
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                                            min={auction.currentHighestBid + 1}
                                            step="1"
                                            required
                                        />
                                    </div>
                                </Form.Field>
                                <Form.Button 
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            Placing Bid...
                                        </>
                                    ) : (
                                        <>
                                            <Gavel className="w-4 h-4" />
                                            Place Bid
                                        </>
                                    )}
                                </Form.Button>
                            </Form>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
                            <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 font-medium">Auction Ended</p>
                            <p className="text-sm text-gray-500 mt-1">Bidding is no longer available</p>
                        </div>
                    )}

                    {/* Bid History */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Gavel className="w-5 h-5 text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Bid History</h3>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {sortedBids.length} bids
                            </span>
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                            {sortedBids && sortedBids.length > 0 ? (
                                <div className="space-y-3">
                                    {sortedBids.map((bid, index) => (
                                        <BidCard 
                                            bid={new Bid(bid)} 
                                            highest={index === 0} 
                                            key={`${bid.id}-${index}`}
                                        />                    
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Gavel className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No bids yet</p>
                                    <p className="text-sm text-gray-400 mt-1">Be the first to place a bid!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}