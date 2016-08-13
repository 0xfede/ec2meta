var AWS = require('aws-sdk')

class Metadata {
  constructor(version = 'latest') {
    this.version = version;
    this.service = new AWS.MetadataService();
    this.cache = {}
  }
  request(path) {
    if (!this.cache[path]) {
      this.cache[path] = new Promise((resolve, reject) => {
        this.service.request('/' + this.version + '/meta-data/' + path, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
    return this.cache[path];
  }
  document() {
    return new Promise((resolve, reject) => {
      this.service.request('/' + this.version + '/dynamic/instance-identity/document', function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }
  user() {
    return new Promise((resolve, reject) => {
      this.service.request('/' + this.version + '/user-data/', function(err, data) {
        if (err) {
          reject(err);
        } else if (data.indexOf('Not Found') !== -1) {
          reject(new Error('not_found'));
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Metadata;