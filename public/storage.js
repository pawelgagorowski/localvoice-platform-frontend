/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-empty-function */

class Storage {
  static tokenStorageHub = './token.html';

  static tokenStorageKey = 'Localvoice@%DOMAIN%';

  constructor() {}

  static async init() {
    try {
      console.log('loging');
      const client = new CrossStorageClient(this.tokenStorageHub, { timeout: 30000 });
      await client.onConnect();
      return client;
    } catch (error) {
      console.log('error', error);
      throw new Error("Can't connect to the token hub");
    }
  }

  static getProperties(requestedProperties) {
    const possibleProperties = ['accessToken', 'refreshToken', 'backendEnvironment'];
    const properties = {};

    possibleProperties.forEach((prop) => {
      if (requestedProperties.hasOwnProperty(prop)) {
        properties[prop] = requestedProperties[prop];
      }
    });
    return properties;
  }

  static async save(properties, client) {
    try {
      client.set(this.tokenStorageKey.replace('%DOMAIN%', properties.backendEnvironment), JSON.stringify(properties));
    } catch (error) {
      throw new Error("Can't set properties to the hub");
    }
  }
}
