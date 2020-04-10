module.exports.getAll = (req, res) => {
  res.status(200).json({login: 'login from controller'})
}

module.exports.create = (req, res) => {
  res.status(200).json({register: 'register from controller'})
}
