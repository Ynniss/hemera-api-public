const Bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    register: function (request, response) {
        if (!request.body.username || !request.body.password) {
            return response.status(400).send("Missing or bad parameter(s).")
        }

        request.body.password = Bcrypt.hashSync(request.body.password)

        const userEntry = {
            username: request.body.username,
            password: request.body.password
        }

        userCollection.insertOne(userEntry, (error, result) => {
            if (error) {
                return response.status(500).send(error)
            }
            response.status(201).send(result.result)
        })
    }, login: function (request, response) {
        if (!request.body.username || !request.body.password) {
            return response.status(411).send("Missing or bad parameter(s).")
        }

        userCollection.findOne({ "username": request.body.username }, (error, result) => {
            if (error) {
                console.log(error)
                throw error
            }

            if (result) {
                if (!Bcrypt.compareSync(request.body.password, result.password)) {
                    return response.status(400).send({ message: "The password is invalid" })
                }

                response.status(200).json({
                    message: "Login Successful !", token: jwt.sign(
                        { userId: result._id },
                        process.env.HEMERA_API_SECRET_TOKEN,
                        { expiresIn: '24h' })
                })
            } else {
                response.status(400).json({ message: "User not found" })
            }
        })
    },
    putIp: function (request, response) {
        const userId = jwt.verify(request.headers.authorization.split(' ')[1], process.env.HEMERA_API_SECRET_TOKEN).userId

        if (!request.body.ip) {
            return response.status(400).send("Bad Request.")
        }

        userCollection.findOneAndUpdate(
            { "_id": ObjectId(userId) },
            { $set: { ip: request.body.ip } }, { returnOriginal: false }, (_, result) => {
                if (result.value) {
                    response.status(201).json({ message: "Ip added to user", user: result.value })
                    return
                } else {
                    response.status(404).json({ message: "user not found" })
                }
            })
    },
    getIp: function (request, response) {
        const userId = jwt.verify(request.headers.authorization.split(' ')[1], process.env.HEMERA_API_SECRET_TOKEN).userId
        const query = { _id: ObjectId(userId) }

        userCollection.findOne(query, (error, result) => {
            if (error) {
                console.log(error)
                throw error
            }

            if (result && result.ip) {
                response.status(200).json({ ip: result.ip })
                return
            } else {
                response.status(404).json({ message: "No ESP found being binded to this user." })
                return
            }
        })
    },
    getUnixTimestamp: function (_, response) {
        return response.status(200).send({ timestamp: Math.floor(Date.now() / 1000) })
    },
    getRgbLeds: function (request, response) {
        const userId = jwt.verify(request.headers.authorization.split(' ')[1], process.env.HEMERA_API_SECRET_TOKEN).userId

        
        userCollection.findOne({ "_id": ObjectId(userId) }, (_, result) => {
            if (result) {
                response.status(201).json({ red: result.red, green: result.green, blue: result.blue })
                return
            } else {
                response.status(404).json({ message: "user not found" })
            }
        })
    }, putRgbLeds: function (request, response) {
        if (!request.body.red, !request.body.green, !request.body.blue) {
            return response.status(400).send("Bad Request.")
        }
        const userId = jwt.verify(request.headers.authorization.split(' ')[1], process.env.HEMERA_API_SECRET_TOKEN).userId

        userCollection.findOneAndUpdate(
            { "_id": ObjectId(userId) },
            { $set: { red: request.body.red, green: request.body.green, blue: request.body.blue } }, { returnOriginal: false }, (_, result) => {
                if (result) {
                    response.status(201).json({ red: result.value.red, green: result.value.green, blue: result.value.blue })
                    return
                } else {
                    response.status(404).json({ message: "user not found" })
                }
            })
    }
}
