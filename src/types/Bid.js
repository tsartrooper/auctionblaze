

export default class Bid{
    constructor(data={}){
        this.id=data.id || null;
        this.amount=data.amount || 0;
        this.timeStamp = data.timeStamp? new Date(data.timeStamp) : null;
        this.bidderName = data.bidderName || "";
        this.auctionListingId = data.auctionListingId || null;
        this.auctionListingName = data.auctionListingName || "";
    }
}