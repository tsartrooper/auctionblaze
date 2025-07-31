import React, { useState, useEffect } from 'react';
import '../../../styles/components.css';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router';
import { Clock, Eye, Gavel, Heart, TrendingUp, Calendar } from 'lucide-react';
import Timer from '../../../components/ui/Timer';
import { getAuctionStats } from '../../../utils/getAuctionStats';
import CurrentBid from '../../../components/ui/CurrentBid';
import { getStatusConfig } from '../../../utils/getStatusConfig';

export function AuctionCard({ auction }) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Real-time countdown
  useEffect(() => {
    const updateTime = () => {
      const timeNow = new Date();
      let targetTime;
      
      if (auction.status === "SCHEDULED") {
        targetTime = new Date(auction.startTime);
      } else if (auction.status === "ACTIVE") {
        targetTime = new Date(auction.endTime);
      } else {
        return;
      }

      const timeDifferenceMs = Math.max(0, targetTime - timeNow);
      
      const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [auction.startTime, auction.endTime, auction.status]);


  if (auction.description === "" || auction.itemName === "") return null;


  const statusConfig = getStatusConfig(auction.status);
  const StatusIcon = statusConfig.icon;

  const getTimeDisplay = () => {
    if (auction.status === "CLOSED") return "Auction ended";
    
    const prefix = auction.status === "SCHEDULED" ? "Starts in" : "Ends in";
    const { days, hours, minutes } = timeLeft;
    
    if (days > 0) return `${prefix}: ${days}d ${hours}h`;
    if (hours > 0) return `${prefix}: ${hours}h ${minutes}m`;
    if (minutes > 0) return `${prefix}: ${minutes}m`;
    return auction.status === "ACTIVE" ? "Ending soon!" : "Starting soon!";
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-80">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {auction.picture ? (
          <img
            src={auction.picture}
            alt={auction.itemName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Gavel className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border ${statusConfig.badge} backdrop-blur-sm`}>
            <StatusIcon className="w-3 h-3" />
            <span className="text-xs font-medium">{statusConfig.text}</span>
          </div>
        </div>

        {/* Bookmark Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${isBookmarked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
          />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            className="bg-white text-gray-900 hover:bg-gray-50 font-medium py-2 px-6 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            onClick={() => navigate(`/auction?auctionId=${auction.id}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight truncate">
              {auction.itemName}
            </h3>
          </div>
          <p className="text-sm text-gray-500 capitalize">{auction.category}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed truncate">
          {auction.description}
        </p>

        {/* Price Section */}
        <CurrentBid auction={auction} gradient={statusConfig.gradient}/>

        <Timer auction={auction} timeLeft={timeLeft} getTimeDisplay={getTimeDisplay} />

        <div className="pt-2 border-t border-gray-100">
          <Button
            onClick={() => navigate(`/auction?auctionId=${auction.id}`)}
          >
            {auction.status === "ACTIVE" ? (
              <>
                <Gavel className="w-4 h-4" />
                Place Bid
              </>
            ) : auction.status === "SCHEDULED" ? (
              <>
                <Calendar className="w-4 h-4" />
                Set Reminder
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                View Result
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}