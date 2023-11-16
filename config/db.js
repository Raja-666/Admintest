const mongoose = require('mongoose')
const connectionURL = "mongodb://127.0.0.1:27017/register"

const registerDB = mongoose.connect(connectionURL)
    .then(connectData => console.log(`mongoDB Server Connecting Success${connectData}`))
    .catch(err => console.log(`error :${err}`))

// module.exports = registerDB