import { useEffect, useState } from "react";
import { AuctionCard } from "./_components/AuctionCard";
import Auction from "../../types/Auction";
import PageHeader from "../../components/globals/PageHeader";
import AddAuction from "./_components/AddAuction";
import { useGetAuctions } from "../../hooks/useGetAuctions";
import { Spinner } from "@chakra-ui/spinner";
import LoadingSpinner from "../../components/globals/loadingSpinner";
import LoadingAuctionSkeleton from "../../components/globals/LoadingAuctionSkeleton";


const API_URL = process.env.REACT_APP_API_URL;
const JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN;

export default function AuctionList(){

    const {data, isLoading, isError} = useGetAuctions();

    const auctions = data?.res || [];
    const pages = data?.pages || 0;

    return (
    <div className="max-md:mt-16 pb-5 border rounded-md md:h-[calc(100vh-32px)] mx-auto container md:overflow-y-scroll">
            <PageHeader header={"Auctions"}>
                <AddAuction />               
            </PageHeader>
    {isLoading? <LoadingAuctionSkeleton />
        : <div className="scroll-smooth gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4">
            {auctions.map((k, idx)=>(
                <AuctionCard key = {idx} auction={k} />
                ))}
        </div>}
    </div>);
}