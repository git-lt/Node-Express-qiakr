var Mock = require('mockjs');

module.exports = Mock.mock({
  status:'@pick(["0", "1"])',
  errmsg:'@csentence(8)'
})
