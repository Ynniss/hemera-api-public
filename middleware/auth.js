const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.HEMERA_API_SECRET_TOKEN)
    const userId = decodedToken.userId
      next()
  } catch {
    response.status(401).json({
      message: "Missing or bad token"
    })
  }
}
