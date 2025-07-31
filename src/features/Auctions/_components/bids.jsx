import React, { useState, useEffect } from 'react';
import { Clock, User, Tag, DollarSign, Calendar, Gavel, Trophy, Eye, Heart } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function AuctionDetail({ auction }) {
    const [timeLeft, setTimeLeft] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [isWatching, setIsWatching] = useState(false);

    // Calculate time remaining
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endTime = new Date(auction.endTime);
            const startTime = new Date(auction.startTime);
            
            let targetTime;
            if (auction.status === 'SCHEDULED') {
                targetTime = startTime;
            } else if (auction.status === 'ACTIVE') {
                targetTime = endTime;
            } else {
                setTimeLeft('Auction ended');
                return;
            }

            const difference = targetTime - now;
            
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
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [auction.endTime, auction.startTime, auction.status]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            SCHEDULED: { color: 'bg-blue-100 text-blue-800', text: 'Scheduled' },
            ACTIVE: { color: 'bg-green-100 text-green-800', text: 'Live Auction' },
            ENDED: { color: 'bg-gray-100 text-gray-800', text: 'Ended' },
            CANCELLED: { color: 'bg-red-100 text-red-800', text: 'Cancelled' }
        };
        
        const config = statusConfig[status] || statusConfig.SCHEDULED;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                {status === 'ACTIVE' && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                {config.text}
            </span>
        );
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleBidSubmit = () => {
        if (!bidAmount || bidAmount <= auction.currentHighestBid) {
            alert('Please enter a valid bid amount higher than the current bid');
            return;
        }
        // Add your bid submission logic here
        console.log('Bid submitted:', bidAmount);
        setBidAmount('');
    };

    const sortedBids = auction.bids ? [...auction.bids].sort((a, b) => b.amount - a.amount) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto p-4 lg:p-6">
                {/* Header Section */}
                <div className="mb-6 bg-white rounded-xl shadow-sm p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                {auction.itemName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <Tag className="w-4 h-4" />
                                    {auction.category}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {Math.floor(Math.random() * 150) + 50} watching
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {getStatusBadge(auction.status)}
                            <Button
                                onClick={() => setIsWatching(!isWatching)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    isWatching 
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <Heart className={`w-4 h-4 ${isWatching ? 'fill-current' : ''}`} />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column: Image and Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Auction Image */}
                        {auction.picture && (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="aspect-video w-full">
                                    <img
                                        src={auction.picture}
                                        alt={auction.itemName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{auction.description}</p>
                        </div>

                        {/* Auction Timeline */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Auction Timeline</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    <span className="font-medium">Starts:</span>
                                    <span>{formatDateTime(auction.startTime)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Calendar className="w-5 h-5 text-red-500" />
                                    <span className="font-medium">Ends:</span>
                                    <span>{formatDateTime(auction.endTime)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bidding Section */}
                    <div className="space-y-6">
                        {/* Current Bid Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                    <span className="text-sm font-medium text-gray-600">Current Highest Bid</span>
                                </div>
                                <div className="text-4xl font-bold text-gray-900">
                                    ₹{auction.currentHighestBid?.toLocaleString('en-IN')}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Starting bid: ₹{auction.startingPrice?.toLocaleString('en-IN')}
                                </div>
                            </div>

                            {/* Timer */}
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {auction.status === 'SCHEDULED' ? 'Starts in' : 
                                         auction.status === 'ACTIVE' ? 'Ends in' : 'Time'}
                                    </span>
                                </div>
                                <div className={`text-2xl font-bold ${
                                    auction.status === 'ACTIVE' ? 'text-red-600' : 'text-blue-600'
                                }`}>
                                    {timeLeft}
                                </div>
                            </div>

                            {/* Bid Form */}
                            {auction.status === "ACTIVE" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Bid Amount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                            <input
                                                type="number"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                                min={auction.currentHighestBid + 1}
                                                placeholder={(auction.currentHighestBid + 1).toString()}
                                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <Button 
                                        onClick={handleBidSubmit}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        <Gavel className="w-5 h-5 mr-2" />
                                        Place Bid
                                    </Button>
                                </div>
                            )}

                            {auction.status === "SCHEDULED" && (
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                    <p className="text-blue-700 font-medium">Auction starts soon!</p>
                                </div>
                            )}

                            {auction.status === "ENDED" && (
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                    <p className="text-gray-700 font-medium">Auction has ended</p>
                                </div>
                            )}
                        </div>

                        {/* Bid History */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Gavel className="w-5 h-5 text-gray-600" />
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Bid History ({sortedBids.length})
                                </h2>
                            </div>
                            
                            <div className="max-h-80 overflow-y-auto space-y-3">
                                {sortedBids.length > 0 ? (
                                    sortedBids.map((bid, index) => (
                                        <div 
                                            key={index} 
                                            className={`p-4 rounded-lg border-l-4 ${
                                                index === 0 
                                                    ? 'bg-green-50 border-green-500' 
                                                    : 'bg-gray-50 border-gray-300'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    <span className="font-medium text-gray-800">
                                                        {bid.bidderName || `User ${bid.bidderId}`}
                                                    </span>
                                                    {index === 0 && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                                            Highest
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">
                                                        ₹{bid.amount?.toLocaleString('en-IN')}
                                                    </div>
                                                    {bid.timestamp && (
                                                        <div className="text-xs text-gray-500">
                                                            {formatDateTime(bid.timestamp)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Gavel className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No bids yet. Be the first to bid!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}