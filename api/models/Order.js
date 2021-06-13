const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true
  },
  departure: {
    type: String,
    required: true
  },
  arrives: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  ticketsStr: {
    type: String,
    required: true
  },
  baggagesStr: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('orders', orderSchema);
