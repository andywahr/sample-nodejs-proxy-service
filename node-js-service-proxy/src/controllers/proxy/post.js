const userTokenCache = require('../../utils/UserTokenCache');
const URL = require('url').URL;
const request = require('request');

const post = ({
    models
}, {
    config
}) => async (req, res, next) => {
    var reqObject = req.body;
    var token = await userTokenCache.getTokenForUser(reqObject.fairwayUserName);
    var uri = new URL(reqObject.encompassUri);

    var responseBody = await (new Promise(
        (resolve, reject) => {
            var options = {
                url: reqObject.encompassUri,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    'bearer': 'bearerToken'
                },
                body: reqObject.encompassBody
            };

            switch (reqObject.encompassMethod) {
                case 'POST':
                    request.post(options, function (err, resp, body) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(body);
                        }
                    });
                    break;

                case 'GET':
                    request.get(options, function (err, resp, body) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(body);
                        }
                    });
                    break;

                case 'PUT':
                    request.put(options, function (err, resp, body) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(body);
                        }
                    });
                    break;

                case 'PATCH':
                    request.patch(options, function (err, resp, body) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(body);
                        }
                    });
                    break;

                case 'DELETE':
                    request.delete(options, function (err, resp, body) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(body);
                        }
                    });
                    break;
            }
        }));

    res.status(200).send(responseBody);
};

module.exports = {
    post
};