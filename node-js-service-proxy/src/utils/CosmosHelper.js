const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require('../../config');

class CosmosHelper {

    constructor() {
        this.client = new CosmosClient({
            endpoint: "https://" + config.cosmosAccountName + ".documents.azure.com",
            auth: {
                masterKey: config.cosmosAccountPassword
            }
        });
        this.databaseId = 'Encompass';
        this.collectionName = 'AuthTokens';
        this.debug = function (msg) {
            console.log(msg);
        };

        this.database = null;
        this.container = null;
    };

    async init() {
        this.debug("Setting up the database...");
        const dbResponse = await this.client.databases.createIfNotExists({
            id: this.databaseId
        });
        this.database = dbResponse.database;
        this.debug("Setting up the database...done!");
        this.debug("Setting up the container...");
        const coResponse = await this.database.containers.createIfNotExists({
            id: this.collectionName
        });
        this.container = coResponse.container;
        this.debug("Setting up the container...done!");
    }

    async findById(itemId) {
        this.debug("Getting an item from the database");
        const {
            body
        } = await this.container.item(itemId).read();
        return body;
    }

    async persist(doc) {
        const {
            body: replaced
        } = await this.container.items.upsert(doc);
        return replaced;
    }
}

module.exports = CosmosHelper;