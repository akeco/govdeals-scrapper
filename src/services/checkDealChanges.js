const Deal = require('../models/Deal');
const { promisify } = require('util');
const axios = require('axios');
const cheerio = require('cheerio');
const find = promisify(Deal.find.bind(Deal));
const updateOne = promisify(Deal.updateOne.bind(Deal));
const { getCurrentBid, getHighBidder } = require('../utils/selectors');
const sendEmail = require('./sendEmail');

const checkDealChange = async () => {
    try {
        let dbResult = await find({});

        if(dbResult && dbResult.length) {
            let calls = [];
            dbResult = dbResult.map((item) => item._doc).filter((item) => item.timestamp > new Date().getTime());
            calls = dbResult.map((item) => axios.get(item.url));

            const results = await Promise.all(calls);
            const updateItems = getDevicesForUpdate(results, dbResult);

            if(updateItems.length) {
                updateItems.forEach(updateItemToMongo);
                sendEmail(updateItems);
            }
        }
    }
    catch(e) {
        console.log("ERR", e);
    }
};

const updateItemToMongo = async (item) => {
    try {
        await updateOne({ _id: item._id }, { $set: { ...item } });
    }
    catch(e) {
        console.log("E", e);
    }
};

const getDevicesForUpdate = (results, dbResult) => {
    const updateItems = [];
    results.forEach((item, index) => {
        const $ = cheerio.load(item.data);
        const currentBid = getCurrentBid(item.data);

        if(currentBid !== dbResult[index].currentBid) {
            const highBidder = getHighBidder(item.data);
            updateItems.push({ ...dbResult[index]._doc, currentBid, highBidder });
        }
    });

    return updateItems;
};

module.exports = checkDealChange;
