console.log("in Restaurant Controller")

const { Restaurant } = require("../models/restaurant.models")

module.exports.allRestaurants = (req,res) =>{
    Restaurant.find({})
    .then(allRest => res.json(allRest))
}

module.exports.newRestaurant = (req, res) => {
    const {name , year, cuisine, desc} = req.body
    Restaurant.create({
        name,
        year,
        cuisine,
        desc
    })
    .then ( product => res.json(product))
    .catch( err => res.json(err))
}

module.exports.viewRestaurant = (req,res) => {
    Restaurant.findOne({_id: req.params._id})
    .then(restaurant => res.json({restaurant}))
    .catch( err => res.json(err))
}

// module.exports.viewProduct = (req, res) => {
//     Product.findOne({_id: req.params.id})
//     .then(oneProduct => res.json({product: oneProduct}))
//     .catch(err=>res.json(err))
// }

module.exports.updateRestaurant = (req, res) => {
    Restaurant.findByIdAndUpdate({_id: req.params._id}, req.body, {new: true, runValidators:true})
    .then(updatedRestaurant => res.json(updatedRestaurant))
    .catch(err=>res.json(err))
}

module.exports.deleteRestaurant = (req, res) => {
    Restaurant.deleteOne({_id: req.params._id})
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }))
    // .then(deletedProduct => res.json(deletedProduct))
    // .catch(err=>res.json(err))
}