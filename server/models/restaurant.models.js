console.log("in restaurant models")


const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, "Your name is required for the review"]
    },
    comment: {
        type : String,
        required: [true, "You cannot submit and empty review!"]
    }, 
    rating: {
        type: Number,
        min : [1, "Rating should be between 1 and 5"], 
        max : [5, "Rating should be between 1 and 5"],
        required: [true, "The rating number is required"]
    }
}, {timestamps:true})


const RestaurantSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Restaurant name is required"],
        minlength: [2, "Restaurant name should be longer than 2 characters"]
    },
    year : {
        type: Number,
        required: [true, "Resturant year is required"],
        min: [1720, "Sorry we dont support restaurants that are before than 1720"],
        max: [new Date().getFullYear() + 1, "Your restaurant doesn't exist yet!"]
    },
    cuisine : {
        type: String,
        required:[true, "Restaurant cuisine is required"],
        minlength: [3, "Restaurant cuisine should be longer than 3 characters"]
    },
    desc : {
        type: String,
        required:[true, "Restaurant description is required"],
        minlength: [10, "Restaurant description should be longer than 10 characters"]
    },
    review : [ReviewSchema]
    
}, {timestamps: true})

module.exports.Restaurant = mongoose.model('Restaurant', RestaurantSchema)
module.exports.Review = mongoose.model('Review', ReviewSchema)
