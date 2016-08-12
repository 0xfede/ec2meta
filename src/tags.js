var instance = require('./instance')

module.exports = function() {
  return instance().then(data => {
    var tags = {};
    var { Tags: t } = data;
    for (i of t) {
      tags[i.Key] = i.Value;
    }
    return tags;
  });
}
