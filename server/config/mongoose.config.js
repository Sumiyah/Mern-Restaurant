console.log("In config file!")

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/restaurants_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => {
    console.log("We have a connection to our database!!!!!")
})
.catch( err => {
    console.log("There was an error creating the database :( !!!!")
})