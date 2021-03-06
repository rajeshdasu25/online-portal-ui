const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const ip = require('ip').address();
const packageJson = require('../package.json');
const _ = require('lodash');
const moment = require('moment');

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

function fetchAnItem(type, id, key) {
    let jsonUrl = './data/' + type + '.json';
    let resultItem;

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let items = JSON.parse(data);        
        resultItem = items.find(item => item.Id == id);//console.log('resultItem: ', resultItem[key]);
        return resultItem[key];
    });
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
    res.send(JSON.stringify(responseData, null, 4));
});

// An api endpoint that returns a short list of items
app.get('/fetchAllItems', (req, res) => {
    let itemType = req.query.type;
    let roleId = req.query.roleId ? req.query.roleId : '';
    let ssoId = req.query.ssoId ? req.query.ssoId : '';
    let jsonUrl = './data/' + itemType + '.json';
    let result;

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let items = JSON.parse(data);
        // res.json(items);
        switch (itemType) {
            case 'responses':
                /*items.forEach(item => {
                    item.skills.map((skill, index) => {
                        let profVal = fetchAnItem('proficiencies', Object.values(skill)[0], 'Name');
                    });
                });*/
                result = (!_.isEmpty(ssoId)) ? items.filter(item => item.ssoId == ssoId) : items;
                break;
            case 'skills':
                // fs.readFile('./data/roles.json', (err, data) => {
                //     let roles = JSON.parse(data);
                //     for (var i = 0; i < items.length; i++) {
                //         for (var j = 0; j < roles.length; j++) { //console.log(roles[j]);
                //             items[i].RoleName = roles[j].DisplayName;
                //         }
                //     }
                // });
                // items.forEach(function (item) {
                //     item.RoleName = fetchAnItem('roles', item.RoleId, 'DisplayName');
                // });
                result = (!_.isEmpty(roleId)) ? items.filter(item => item.RoleId == roleId) : items;
                break;
            default:
                result = items;
                break;
        }
        res.json(result);
    });
});

app.get('/fetchAnItem', (req, res) => {
    let itemType = req.query.type;
    let itemId = req.query.id;
    let SsoId = req.query.ssoId ? req.query.ssoId : '';
    let jsonUrl = './data/' + itemType + '.json';
    let resultItem;

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let items = JSON.parse(data);
        if (itemType === 'users') {
            resultItem = items.find(item => item.SsoId == SsoId);
        } else {
            resultItem = items.find(item => item.Id == itemId);
        }
        res.json(resultItem);
    });
});

app.post('/addAnItem', (req, res) => {
    let itemType = req.query.type;
    let jsonUrl = './data/' + itemType + '.json';
    let formData = {};
    let checkJsonField = '';
    let reqBodyData = '';
    let reqBodyName = req.body.Name ? (req.body.Name).toLowerCase().split(' ').join('-') : '';

    fs.readFile(jsonUrl, (err, data) => {
        let resultObj = {};
        if (err) throw err;
        let items = JSON.parse(data);
        switch (itemType) {
            case 'certificates':
                formData = {
                    'Id': items.length + 1,
                    'Name': req.body.Name,
                    'Authority': req.body.Authority,
                    'ActiveStatus': "1"
                };
                checkJsonField = 'Name';
                reqBodyData = req.body.Name;
                break;
            case 'forms':
                formData = {
                    'Id': items.length + 1,
                    'Name': req.body.Name,
                    'Description': req.body.Description,
                    'ActiveStatus': "1"
                };
                checkJsonField = 'Name';
                reqBodyData = req.body.Name;
                break;
            case 'proficiencies':
                formData = {
                    'Id': items.length + 1,
                    'Name': req.body.Name,
                    'Value': req.body.Value,
                    'ActiveStatus': "1"
                };
                checkJsonField = 'Name';
                reqBodyData = req.body.Name;
                break;
            case 'roles':
                formData = {
                    'Id': items.length + 1,
                    'Name': (req.body.Name).toLowerCase().split(' ').join('-'),
                    'DisplayName': req.body.Name,
                    'ActiveStatus': "1"
                };
                checkJsonField = 'Name';
                reqBodyData = reqBodyName;//req.body.Name;
                break;
            case 'responses':
                formData = {
                    'Id': items.length + 1,
                    'ssoId': req.body.userSsoId,
                    'fullName': req.body.userFullName,
                    'certifications': req.body.userCertifications,
                    'skills': req.body.userSkills,
                    'trainings': req.body.userTrainings,
                    'dateTime': req.body.dateTime,
                    'ActiveStatus': "1"
                };
                break;
            case 'skills':
                formData = {
                    'Id': items.length + 1,
                    'RoleId': req.body.RoleId,
                    'Name': (req.body.Name).toLowerCase().split(' ').join('-'),
                    'DisplayName': req.body.Name,
                    'ActiveStatus': "1"
                };
                checkJsonField = 'Name';
                reqBodyData = reqBodyName;//req.body.Name;
                break;
            case 'trainings':
                formData = {
                    'Id': items.length + 1,
                    'Name': req.body.Name,
                    'Description': req.body.Description,
                    'ActiveStatus': "1"
                };
                checkJsonField = 'Name';
                reqBodyData = req.body.Name;
                break;
            case 'users':
                formData = {
                    'Id': items.length + 1,
                    'UserTypeId': req.body.UserTypeId,
                    'RoleId': req.body.RoleId,
                    'SsoId': req.body.SsoId,
                    'KinId': req.body.KinId,
                    'Pword': req.body.SsoId + '_' + moment(req.body.DateOfBirth).format('DDMMYYYY'),
                    'FirstName': req.body.FirstName,
                    'LastName': req.body.LastName,
                    'CgEmail': req.body.CgEmail,
                    'SyfEmail': req.body.SyfEmail,
                    'DateOfBirth': req.body.DateOfBirth,
                    'Designation': req.body.Designation,
                    'Band': req.body.Band,
                    'Grade': req.body.Grade,
                    'SyfTower': req.body.SyfTower,
                    'SyfApplication': req.body.SyfApplication,
                    'ActiveStatus': "1"
                };
                checkJsonField = 'SsoId';
                reqBodyData = req.body.SsoId;
                break;
        }
        let item = items.find(item => item[checkJsonField] == reqBodyData);//console.log('item: ', item);
        if (_.isEmpty(item)) {
            items.push(formData);
            fs.writeFile(jsonUrl, JSON.stringify(items, null, 4), function (err) {
                if (err) throw err;
                //res.send(formData);
            });
            resultObj.insertStatus = "SUCCESS";
        } else {
            resultObj.insertStatus = "ALREADY_EXIST";
        }
        /*items.push(formData);
        fs.writeFile(jsonUrl, JSON.stringify(items, null, 4), function (err) {
            if (err) throw err;
            res.send(formData);
        });*/
        res.json(resultObj);
    });
});

app.post('/login', (req, res) => {
    let SsoId = req.body.SsoId;
    let Password = req.body.Password;
    let jsonUrl = './data/users.json';

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let resultObj = {};
        let users = JSON.parse(data);
        let user = users.find(item => item.SsoId == SsoId);
        if (!_.isEmpty(user)) {
            if (user.Pword === Password) {
                if (user.ActiveStatus == '1') {
                    resultObj.userValidity = "VALID_USER";
                    resultObj.userId = user.Id;
                    resultObj.ssoId = user.SsoId;
                    resultObj.userTypeId = user.UserTypeId;
                    resultObj.userRoleId = user.RoleId;
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