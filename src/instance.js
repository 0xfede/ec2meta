var AWS = require('aws-sdk')
  , Metadata = require('./meta')

module.exports = function() {
  var meta = new Metadata();
  return meta.request('/placement/availability-zone').then(zone => {
    var region = zone.substr(0, zone.length - 1);
    return meta.request('/instance-id').then(instanceId => {
      return new Promise((resolve, reject) => {
        var ec2 = new AWS.EC2({ region: region });
        ec2.describeInstances({ InstanceIds: [ instanceId ] }, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data.Reservations[0].Instances[0]);
          }
        });
      });
    });
  })
}
