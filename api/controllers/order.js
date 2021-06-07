exports.getAll = (req, res) => {
  res.status(200).json({
    msg: 'It is getAll'
  })
}

exports.makeOne = (req, res) => {
  res.status(200).json({
    msg: 'It is makeOne'
  })
}

exports.delete = (req, res) => {
  res.status(200).json({
    msg: 'It is delete'
  })
}
