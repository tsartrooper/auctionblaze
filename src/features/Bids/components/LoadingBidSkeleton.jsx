// import "../../styles/components.css";

export default function LoadingBidSkeleton(){
    return (<div className="grid gap-6 p-4">
            {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="card space-y-4 p-6 animate-pulse">
                <div className="loading-skeleton h-6 w-3/4 rounded"></div>
            </div>
            ))}
        </div>);
}