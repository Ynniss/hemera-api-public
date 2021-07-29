const Express = require("express")
const BodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const CONNECTION_URL = ENV["CONNECTION_URL"]
const DATABASE_NAME = "hemeraDBv2"
var routes = require('./routes')
const app = Express()
var database

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error
        }
        database = client.db(DATABASE_NAME)
        userCollection = database.collection("user")
        sensorCollection = database.collection("sensor")

        console.log("Connected to `" + DATABASE_NAME + "`!")
    })
})
