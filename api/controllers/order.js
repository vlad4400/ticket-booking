const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

exports.getAll = async (req, res) => {

  const orders = await Order.find({ userId: req.user._id });
  
  if (orders) {
    const ordersOnly = orders.map(({departure, arrives, date, ticketsStr, baggagesStr}) => {
      return {
        departure,
        arrives,
        date,
        ticketsStr,
        baggagesStr
      };
    });
    res.status(200).json({orders: ordersOnly});
  } else {
    res.status(404).json({
      message: 'Zamówień nie znaleziono'
    })
  }
}

exports.makeOne = async (req, res) => {

  const order = new Order({
    userId: req.user._id,
    ...req.body
  });

  try {
    await order.save();
    res.status(201).json({
      message: 'Utworzono nowe zamówienie'
    });
  } catch(err) {
    res.status(500).json({
      message: 'Błąd'
    });
  }
}

exports.delete = (req, res) => {
  res.status(200).json({
    msg: 'It is delete'
  })
}
