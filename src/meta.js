var AWS = require('aws-sdk')

class Metadata {
  constructor(root) {
    this.root = root || Metadata.DEFAULT_ROOT;
    this.service = new AWS.MetadataService();
    this.cache = {}
  }
  request(path) {
    if (!this.cache[path]) {
      this.cache[path] = new Promise((resolve, reject) => {
        this.service.request(this.root + path, function(err, data) {
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
}
Metadata.DEFAULT_ROOT = '/latest/meta-data';

module.exports = Metadata;