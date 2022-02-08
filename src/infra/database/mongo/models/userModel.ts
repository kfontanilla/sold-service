const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  email: { type: String },
  city: { type: String },
  addressCords: { type: Object },
  photos: { type: Array },
});

export const userModel = mongoose.model('User', userSchema);
