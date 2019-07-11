const cheerio = require('cheerio');
const removeUnnecessaryCharacters = require('./removeUnnecessaryCharacters');

exports.getBidIncrement = (dom) => {
    const $ = cheerio.load(dom);
    const incrementValue = removeUnnecessaryCharacters($('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2)').text());
    return removeUnnecessaryCharacters(incrementValue, '$');
};

exports.getExpire = (dom) => {
    const $ = cheerio.load(dom);
    return removeUnnecessaryCharacters($('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)').text());
};

exports.getCurrentBid = (dom) => {
    const $ = cheerio.load(dom);
    return removeUnnecessaryCharacters($('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(2)').text());
};

exports.getHighBidder = (dom) => {
    const $ = cheerio.load(dom);
    return removeUnnecessaryCharacters($('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2) > b').text());
};

exports.getTitle = (dom) => {
    const $ = cheerio.load(dom);
    return $('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(1) > h1').text();
};

exports.getStartBid = (dom) => {
    const $ = cheerio.load(dom);
    //return $('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > b').text();
    return removeUnnecessaryCharacters($('td:contains("Starting Bid: ") + td').text());
};

exports.getEnds = (dom) => {
    const $ = cheerio.load(dom);
    return $('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > b').text();
};

exports.getNumberOfBidders = (dom) => {
    const $ = cheerio.load(dom);
    return $('#viewBidHistory').text();
};

exports.getImages = (dom) => {
    const $ = cheerio.load(dom);
    const images = [];

    $('[id^=thumb]').each((index, item) => {
        images.push(`https://www.govdeals.com${ $(item).find('img').attr('src').replace('/Thumbnails', '') }`);
    });

    return images;
};

exports.getClosedAuction = (dom) => {
    const $ = cheerio.load(dom);
    return $('body > table:nth-child(9) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td').text();
};

exports.getTimestamp = (dom) => {
    const $ = cheerio.load(dom);
    const timestamp = $('body > table:nth-child(13) > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > b').text();
    return timestamp.replace(' ET', '');
};
