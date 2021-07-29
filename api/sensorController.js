const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    getSensorData: function (request, response) {
        const userId = jwt.verify(request.headers.authorization.split(' ')[1], process.env.HEMERA_API_SECRET_TOKEN).userId
        const query = { user_id: userId }

        removeSensorDataOlderThan(14)

        sensorCollection.find(query).sort({ _id: -1 }).limit(14).toArray(function (error, result) {
            if (error) {
                console.log(error)
                throw error
            }
            response.status(200).json(result)
        })
    },
    putSensorData: function (request, response) {
        const userId = jwt.verify(request.headers.authorization.split(' ')[1], process.env.HEMERA_API_SECRET_TOKEN).userId

        if (!request.body.co2 || !request.body.humidity || !request.body.temperature) {
            return response.status(400).send("Bad Request.")
        }

        var newSensorEntry = {
            user_id: userId,
            co2: request.body.co2,
            humidity: request.body.humidity,
            temperature: request.body.temperature,
        }

        sensorCollection.insertOne(newSensorEntry, (error, result) => {
            if (error) {
                return response.status(500).send(error)
            }
            response.status(201).send({result: result.result, timestamp: Math.floor(Date.now() / 1000)})
        })
    }
}

function removeSensorDataOlderThan(threshold) {
    sensorCollection.find({}).forEach(function (record) {
        const recordDateTimestamp = record._id.getTimestamp()
        const currentDate = new Date()
        const currentDateTimestamp = currentDate.getTime()

        const difference = currentDateTimestamp - recordDateTimestamp
        const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)

        if (daysDifference > threshold) {
            sensorCollection.remove({ _id: record._id })
        }
    })
}