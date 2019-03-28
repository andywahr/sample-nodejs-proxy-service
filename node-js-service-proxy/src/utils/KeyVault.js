
const KeyVault = require('azure-keyvault');
const msRestAzure = require('ms-rest-azure');
const config = require('../../config');

class KeyVaultHelper {

    async init() {
        var credentials = null;
        if (process.env.APPSETTING_WEBSITE_SITE_NAME){
            credentials = await msRestAzure.loginWithAppServiceMSI({resource: 'https://vault.azure.net'});
          } else {
            credentials = await msRestAzure.loginWithServicePrincipalSecret(process.env.AZURE_CLIENT_ID, process.env.AZURE_CLIENT_SECRET, process.env.AZURE_TENANT_ID);
        }
    
        this.keyVaultClient = new KeyVault.KeyVaultClient(credentials);
        this.vaultUri = "https://" + config.keyVaultAccountName + ".vault.azure.net/";
    };

    async getSecret(secretName) {
        var secretVal = await this.keyVaultClient.getSecret(this.vaultUri, secretName, "");
        return secretVal.value;
    }
}

module.exports = KeyVaultHelper;

