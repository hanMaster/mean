module.exports.overview = (req, res) => {
  res.status(200).json({login: 'login from controller'})
}

module.exports.analytics = (req, res) => {
  res.status(200).json({register: 'register from controller'})
}
