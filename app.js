// Add the middelware bodyparser thet add the user data
const bodyParser = require('body-parser');
const index = require('./routes/index');
var cors = require('cors');
module.exports = (app) => {
	app.use(cors())
    app.use(bodyParser.json())

    app.use('/api', index);

    //invalid url
    app.all('*', (req, res) => {
        res.send("invalid url " + String(req.url));
    });

}