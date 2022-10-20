const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const comparePassword = (password, hash, done) => {
    bcrypt.compare(password, hash, done);
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;