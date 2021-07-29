const express = require('express')
const userController = require('./api/userController')
const sensorController = require('./api/sensorController')
const statusController = require('./api/statusController')
const auth = require('./middleware/auth')

var router = express.Router()

router.route('/ip').all(auth).put(userController.putIp)
router.route('/ip').all(auth).get(userController.getIp)

router.route('/sensor/past-fourteen-days').all(auth).get(sensorController.getSensorData)
router.route('/sensor').all(auth).put(sensorController.putSensorData)

router.route('/ping').get(statusController.getPong)

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/unix-timestamp').get(userController.getUnixTimestamp)
router.route('/rgb-leds').all(auth).get(userController.getRgbLeds)
router.route('/rgb-leds').all(auth).put(userController.putRgbLeds)

module.exports = router
