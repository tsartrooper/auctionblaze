import { Tag } from "lucide-react";


export default function QuickInfo({ children }){
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            {children}
        </div>
    );
}