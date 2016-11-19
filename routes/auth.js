'use strict';

var express = require('express'),
    router = express.Router(),
    userdbCtrl = require('../db/controller/index.js').user,
    request = require('request');





router.post('/google', function (req, res) {
    let accessTokenUrl = 'https://accounts.google.com/o/oauth2/token',
        peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
        params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: "7_6tR1qeH0c-5Scj6_kaSqTh",
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
        json: true,
        form: params
    }, function (err, response, token) {
        debugger;
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({
            url: peopleApiUrl,
            headers: headers,
            json: true
        }, function (err, response, profile) {
            debugger;
            if (profile.error) {
                return res.status(500).send({
                    message: profile.error.message
                });
            }

            //step 3 check if user exists
            userdbCtrl.find({
                'mail': profile.email
            }, function (err, user) {
                debugger;
                //step 4 create user
                if (user.length == 0) {
                    let userObject = {
                        'firstname': profile.given_name,
                        'lastname': profile.family_name,
                        'mail': profile.email,
                        'IsAdmin': false,
                        'password': null,
                        'username': profile.email
                    }
                    userdbCtrl.save(userObject, (err, response) => {
                        let token = createJWT(user);
                        res.send({
                            userObject: response
                        });
                    })
                } else {
                    res.send({
                        userObject: user[0]
                    });
                }
            });


        })

    })



}).post('/facebook', function (req, res) {

})

module.exports = router;