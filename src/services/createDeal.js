const Deal = require('../models/Deal');
const axios = require('axios');
const cheerio = require('cheerio');
const { promisify } = require('util');
const create = promisify(Deal.create.bind(Deal));
const {
    getTitle,
    getStartBid,
    getEnds,
    getExpire,
    getCurrentBid,
    getBidIncrement,
    getHighBidder,
    getImages,
    getClosedAuction,
    getTimestamp
} = require('../utils/selectors');

const createDeal = async (req, res, next) => {
    try {
        const { itemid, acctid, limit } = req.query;

        if(itemid && acctid && limit) {
            const url = `https://www.govdeals.com/index.cfm?fa=Main.Item&itemid=${itemid}&acctid=${acctid}`;
            const { data: domData } = await axios.get(url);
            const $ = cheerio.load(domData);
            const isClosed = getClosedAuction(domData) === 'Auction Closed';

            if(!isClosed) {
                let timestamp = getTimestamp(domData);

                let dataItem = {
                    title: getTitle(domData),
                    startBid: getStartBid(domData),
                    higherBidder: getHighBidder(domData),
                    ends: getEnds(domData),
                    timestamp: new Date(timestamp).getTime(),
                    numberOfBidders: $('#viewBidHistory').text(),
                    currentBid: getCurrentBid(domData),
                    expire: getExpire(domData),
                    bidIncrement: getBidIncrement(domData),
                    images: getImages(domData),
                    url,
                    limit
                };
                dataItem = getValidObject(dataItem);

                console.log("TEST", dataItem);

                await create(dataItem);
                return res.json({ saved: true });
            }
            else {
                throw new Error("Auction for product is closed");
            }
        }
        else {
            throw new Error("Missing data, itemid, acctid, limit");
        }
    }
    catch(e) {
        return res.status(400).json({ error: e.message });
    }
};

module.exports = createDeal;

const getValidObject = (object) => {
    const data = {};

    Object.keys(object).forEach((key) => {
        if(object[key]) data[key] = object[key];
    });

    return data;
};
