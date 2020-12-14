console.log("in REVIEW Controller")

const { Review, Restaurant } = require("../models/restaurant.models")

module.exports.createReview = (req,res) => {
    const {name , rating , comment} = req.body
    Restaurant.findOne({_id: req.params})
    .then(restaurant => {
        let exist = false
        for(let review of restaurant.review){
            if(review.name === req.body.name){
                exist = true
                break
            }
        }
        if(exist){
            res.json({
                errors: {name: {message: `${req.body.name} you have already reviewed this restaurant!`}}
            })
        } else {

            Review.create({name, rating, comment})
            .then(newReview => {
                Restaurant.findOneAndUpdate({ _id: req.params._id }, { $push: { review: newReview } })
                    .then(res.json({ msg: "ok" }))
                    .catch(err => res.json(err));
            }).catch(err => res.json(err));
        }
    })
    .catch(err => res.json(err))

}

module.exports.allReviews 

