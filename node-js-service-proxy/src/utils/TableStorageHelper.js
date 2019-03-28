const azurestorage = require('azure-storage');
const config = require('../../config');

class TableStorageHelper {

    constructor() {
        this.client = azurestorage.createTableService(config.storageAccountName, config.storageAccountKey);
    }

    async findByName(name) {
        return new Promise(
            (resolve, reject) => { 
                this.client.retrieveEntity('UserLookup', 'UserName', name, function(error, result, response){
                    if(!error){                    
                       resolve(result.EncompassUser);
                    }  else {
                       reject(error); 
                    }
                });
        });
    }
}

module.exports = TableStorageHelper;