var crypto = require('crypto');

function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}

function createHash(password, salt) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

module.exports = {
  genRandomString,
  createHash
};
