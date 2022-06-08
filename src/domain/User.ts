const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: String,
  email: String,
})(class User {});

module.exports = User;
