const Restaurant = require('../controllers/restaurant.controller')
const Reviews = require('../controllers/review.controller')

console.log("In ROUTES")

module.exports = (app) => {
    app.get('/api/restaurants', Restaurant.allRestaurants)
    app.get('/api/restaurants/:_id', Restaurant.viewRestaurant)
    app.post('/api/restaurants/new', Restaurant.newRestaurant)
    app.put('/api/restaurants/update/:_id', Restaurant.updateRestaurant)
    app.delete('/api/restaurants/delete/:_id', Restaurant.deleteRestaurant)

    app.post('/api/restaurants/:_id/reviews', Reviews.createReview)
}
