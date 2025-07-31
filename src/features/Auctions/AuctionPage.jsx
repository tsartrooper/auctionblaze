import { useParams, useSearchParams } from "react-router";
import LoadingAuctionSkeleton from "../../components/globals/LoadingAuctionSkeleton";
import LoadingSpinner from "../../components/globals/loadingSpinner";
import PageHeader from "../../components/globals/PageHeader";
import { useGetAuctionById } from "../../hooks/useGetAuctionById";
import AuctionDetail from "./_components/AuctionDetail";


export function AuctionPage(){
    const [ searchParams ] = useSearchParams();

    const auctionId = searchParams.get("auctionId");

    const { data: auction, isLoading, isError } = useGetAuctionById({ auctionId });

    return (<div className="max-md:mt-16 pb-5 border rounded-md md:h-[calc(100vh-32px)] mx-auto container md:overflow-y-scroll">
        <PageHeader header={`Auction` } />
        {isLoading && <LoadingSpinner />}
        {isError && <p>error</p>}
        {!isLoading && !isError && <AuctionDetail auction={auction}/>}
    </div>)

    

}