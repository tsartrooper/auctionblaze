export const getAuctionStats = (auction) => {
    if (!auction.bids || auction.bids.length === 0) return null;
    const bidCount = auction.bids.length;
    const priceIncrease = auction.currentHighestBid - auction.startingPrice;
    const percentageIncrease = ((priceIncrease / auction.startingPrice) * 100).toFixed(0);
    return { bidCount, percentageIncrease: percentageIncrease > 0 ? percentageIncrease : 0 };
};