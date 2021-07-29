module.exports = {
    getPong: function (_, response) {
        return response.status(200).send({"message":"pong"})
    }
}
