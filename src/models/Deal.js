const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    limit: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    images: [String],
    startBid: { type: String, required: true },
    highBidder: String,
    currentBid: { type: String, required: true },
    expire: { type: String, required: true },
    numberOfBidders: Number,
    bidIncrement: { type: String, required: true },
    ends: { type: String, required: true },
});

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
