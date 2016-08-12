var AWS = require('aws-sdk')
  , Metadata = require('./meta')

module.exports = function() {
  var meta = new Metadata();
  return meta.document().then(doc => {
    return new Promise((resolve, reject) => {
      var ec2 = new AWS.EC2({ region: doc.region });
      ec2.describeInstances({ InstanceIds: [ doc.instanceId ] }, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.Reservations[0].Instances[0]);
        }
      });
    });
  })
}
