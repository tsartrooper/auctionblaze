import "../../styles/components.css";

export default function LoadingAuctionSkeleton(){
    return (<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4">
            {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="card space-y-4 p-6 animate-pulse">
                <div className="loading-skeleton h-48 w-full rounded-lg"></div>
                <div className="loading-skeleton h-6 w-3/4 rounded"></div>
                <div className="loading-skeleton h-4 w-1/2 rounded"></div>
                <div className="loading-skeleton h-4 w-2/3 rounded"></div>
            </div>
            ))}
        </div>);
}