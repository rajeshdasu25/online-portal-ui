const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const ip = require('ip').address();
const packageJson = require('../package.json');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5001;
app.listen(port);

console.log('App is listening on port ' + port);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

app.get('/ping', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var responseData = {
        "Server Status": "Up and Running",
        "Port": port,
        "Instance IP address": ip,
        "Environment": "Dev",
        "Application Version": packageJson.version,
        "Node Version": process.version
    };
    res.status(200).send(JSON.stringify(responseData, null, 4));
});

// An api endpoint that returns a short list of items
app.get('/fetchAllItems', (req, res) => {
    let itemType = req.query.type;
    let jsonUrl = './data/' + itemType + '.json';

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let items = JSON.parse(data);
        res.json(items);
    });
});

app.get('/fetchAnItem', (req, res) => {
    let itemType = req.query.type;
    let itemId = req.query.id;
    let jsonUrl = './data/' + itemType + '.json';

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let items = JSON.parse(data);console.log('items: ', items);
        let resultItem = items.find(item => item.Id == itemId);
        res.json(resultItem);
    });
});

app.post('/login', (req, res) => {
    let Username = req.body.Username;
    let Password = req.body.Password;
    let jsonUrl = './data/users.json';

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let resultObj = {};
        let users = JSON.parse(data);
        let user = users.find(item => item.Username == Username);
        if(!_.isEmpty(user)) { 
            if(user.Pword === Password) {
                if(user.ActiveStatus == '1') {
                    resultObj.userValidity = "VALID_USER";
                    resultObj.userId = user.Id;
                    resultObj.ssoId = user.SsoId;
                    resultObj.userTypeId = user.UserTypeId;
                } else {
                    resultObj.userValidity = "ACCESS_DENIED";
                }
            } else {
                resultObj.userValidity = "WRONG_PWD";
            }
        } else {
            resultObj.userValidity = "NOT_EXIST";
        }

        res.json(resultObj);
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
});