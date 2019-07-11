require('dotenv').config();
const bodyParser = require('body-parser');
const app = require('express')();
const schedule = require('node-schedule');
const port = 3000;
require('./src/config/mongoose')(app);
const createDeal = require('./src/services/createDeal');
const checkDealChange = require('./src/services/checkDealChanges');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', createDeal);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    const j = schedule.scheduleJob('5 * * * * *', () => {
        console.log('The answer to life, the universe, and everything!');
        checkDealChange();
    });
});
