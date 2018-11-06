var express = require('express');
var app = express();
var request = require('request');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.sendFile('views/index.html', { root: __dirname });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/search/:word', function (req, res) {

    console.log(req.params.word);
    //res.send(req.body);
    request('https://od-api.oxforddictionaries.com/api/v1/entries/en/' + req.params.word, {
        headers: {
            'app_id': process.env.APPID,
            'app_key': process.env.APPKEY
        }
    }, (err, resposnse, body) => {
        console.log(body)
        if (err) { return console.log(err); }
        if (body.slice(0, 2) === "<!") {
            res.status(404).json({ error: 'no defintion found for this word' });
        } else {
            if (JSON.parse(body).results[0].lexicalEntries[0].entries[0].senses[0].definitions) {
                res.send(JSON.parse(body).results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);

            } else {
                res.send(JSON.parse(body).results[0].lexicalEntries[0].entries[0].senses[0].crossReferenceMarkers[0]);

            }
        }

    });


});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));