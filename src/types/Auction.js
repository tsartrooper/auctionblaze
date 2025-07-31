// import {formatCurrency, formatTimeRemaining} from '../utils/formatters'

export default class Auction{
    constructor(data={}){
        this.id = data.id || null;
        this.category=data.category || '';
        this.currentHighestBid = data.currentHighestBid || 0;
        this.currentHighestBidderId = data.currentHighestBidderId || null;
        this.description= data.description || '';
        this.duration=data.duration || null;
        this.endTime= data.endTime? new Date(data.endTime) : null;
        this.itemName = data.itemName || '';
        this.sellerId = data.sellerId || null;
        this.startTime = data.startTime? new Date(data.startTime) : null;
        this.startingPrice = data.startingPrice || 0;
        this.status = data.status || null;    
        this.bids = data.bids || [];
        this.picture = data.picture;
    }
}