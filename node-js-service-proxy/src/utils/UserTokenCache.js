const cosmos = require('./CosmosHelper');
const tableStorage = require('./TableStorageHelper');
const keyVault = require('./KeyVault');
const request = require('request');

getTokenForUser = async (name) => {

    const cosmosHelper = new cosmos();
    await cosmosHelper.init();
    const tableStorageHelper = new tableStorage();
    const keyVaultHelper = new keyVault();
    await keyVaultHelper.init();

    var token = "";

    try {
        var tokenDoc = await cosmosHelper.findById(name);
        token = tokenDoc.token;
    } catch (e) {

    }

    if (token == "") {
        var encompassUserName = await tableStorageHelper.findByName(name);

        if (encompassUserName._ != null || encompassUserName._.length > 0) {
            var password = await keyVaultHelper.getSecret(encompassUserName._);

            var responseJson = await callEncompassForToken(encompassUserName._, password);

            var returnedAuth = JSON.parse(responseJson);
            token = returnedAuth.token;

            await cosmosHelper.persist({
                "id": name,
                "name": name,
                "token": token
            })

        }
    }

    return token;
};

function callEncompassForToken(encompassUserName, password) {
    return new Promise(function (resolve, reject) {
            try {
                var options = {
                    url: 'https://andywahrfunc.azurewebsites.net/api/HttpTrigger2',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'                   
                    },
                    auth: {
                        encompassUserName : password
                    }
                };

                request.post(options, function(err, resp, body) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(body);
                    }
                });

                /*var request = https.request(options, (response) => {
                    // handle http errors
                    if (response.statusCode < 200 || response.statusCode > 299) {
                        reject(new Error('Failed to load page, status code: ' + response.statusCode));
                    }
                    // temporary data holder
                    const body = [];
                    // on every content chunk, push it to the data array
                    response.on('data', (chunk) => {
                        body.push(chunk);
                    });
                    // we are done, resolve promise with those joined chunks
                    response.on('end', () => {
                        resolve(body.join(''));
                    });

                    // handle connection errors of the request
                    request.on('error', (err) => {
                        reject(err);
                    }); 
                });*/
            } catch (e) {
                reject(e);
            }
        });
}

module.exports = {
    getTokenForUser
};