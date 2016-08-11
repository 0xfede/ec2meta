var AWS = require('aws-sdk')
  , Metadata = require('./meta')

module.exports = function() {
  var meta = new Metadata();
  return meta.request('/placement/availability-zone').then(zone => {
    var region = zone.substr(0, zone.length - 1);
    return meta.request('/instance-id').then(instanceId => {
      return new Promise((resolve, reject) => {
        var ec2 = new AWS.EC2({ region: region });
        ec2.describeTags({ Filters: [ { Name: 'resource-id', Values: [ instanceId ] } ] }, function(err, data) {
          if (err) {
            reject(err);
          } else {
            var tags = {};
            var { Tags: t } = data;
            for (i of t) {
              tags[i.Key] = i.Value;
            }
            resolve(tags);
          }
        });
      });
    });
  })
}
