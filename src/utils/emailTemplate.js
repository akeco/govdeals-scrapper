const emailTemplate = (items) => {
    return (
        `
            <html>
                <style>
                    body {
                        background-color: white;
                    }
                    .wrapper {
                        margin: 10px 0;
                        display: flex;
                    }
                    .images-wrapper {
                        padding-top: 17px;
                        margin-left: 25px;
                        flex-grow: 1;
                    }
                    img {
                        height: 80px;
                    }
                    a {
                        margin-right: 20px;
                    }
                </style>
                <body>
                    <h2>Updated Items</h2>
                    ${
                        items.map((item) => (
                            `<div class="wrapper">
                                <div>
                                    <h3>${item.title}</h3>
                                    <h3>Current bid: ${item.currentBid}</h3>
                                    <p>Limit: ${item.limit}</p>
                                    <p>Start bid: ${item.startBid}</p>
                                    <p>Expires: ${item.expire}</p>
                                    ${ item.highBidder ? `<p>Highest bidder: ${item.highBidder}</p>` : '' }
                                    ${item.numberOfBidders ? `<p>Number of bidders: ${item.numberOfBidders}</p>` : '' } 
                                </div>
                                <div class="images-wrapper">
                                    ${
                                        item.images.map((url) => `<a href="${url}"><img src="${url}" /></a>`).join('')
                                    }
                                </div>
                            </div>`
                        )).join('')
                    }
                </body>
            </html>
        `
    );
};

module.exports = emailTemplate;
