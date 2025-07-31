import { Calendar, Clock, TrendingUp } from "lucide-react";


export const getStatusConfig = (status) => {
    const configs = {
        "SCHEDULED": {
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Calendar,
        text: "Scheduled",
        gradient: "from-amber-50 to-yellow-50"
        },
        "ACTIVE": {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: TrendingUp,
        text: "Live",
        gradient: "from-emerald-50 to-green-50"
        },
        "CLOSED": {
        badge: "bg-slate-50 text-slate-700 border-slate-200",
        icon: Clock,
        text: "Ended",
        gradient: "from-slate-50 to-gray-50"
        }
    };
    return configs[status] || configs["CLOSED"];
};