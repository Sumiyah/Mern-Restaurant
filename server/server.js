console.log("in server.js!!")

const express = require("express")
const cors = require('cors')
const app = express()
const port = 8000

require('./config/mongoose.config')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('./routes/restaurants.routes')(app)

app.listen(port, () => console.log(`Listening on port: ${port}`))