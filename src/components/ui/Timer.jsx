import { Clock } from "lucide-react";


export default function Timer({status, timeLeft, getTimeDisplay}){
    return <div className="flex items-center justify-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className={`font-medium ${
                status === "ACTIVE" && timeLeft.days === 0 && timeLeft.hours < 1 
                    ? "text-red-600" 
                    : "text-gray-700"
                }`}>
                {getTimeDisplay()}
                </span>
            </div>
}