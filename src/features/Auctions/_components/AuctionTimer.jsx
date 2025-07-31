import { Clock } from "lucide-react";



export default function AuctionTimer({ timeLeft, status }){
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