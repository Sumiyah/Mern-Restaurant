import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from '@reach/router'



const RestaurantInfo = props => {
  const [restaurant, setRestaurant] = useState({ review: [] })
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(3)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/restaurants/${props._id}`)
      .then(res => {
        console.log("RESPONSE in res info:", res);
        setRestaurant(res.data.restaurant)
        // console.log(res.data)
        // console.log(restaurant)
      })
      .catch(err => console.log(err))
  }, [props._id])

  const addReview = (e) => {
    e.preventDefault();
    console.log(name,
      comment,
      rating)
    axios.post(`http://localhost:8000/api/restaurants/${props._id}/reviews`, {
      name,
      comment,
      rating
    })
      .then(res => {
        console.log("respone:  ", res)
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {

          setName("")
          setComment("")
          setRating(3)
        }
      })
      .catch(err => console.log("Error: ", err))
  }

  // function getReviews() {
  //   axios.get("http://localhost:8000/api/restaurants")
  //     .then(res => {
  //       console.log("RESPONSE:", res);
  //       setRestaurants(res.data)
  //     })
  //     .catch(err => console.log("Error: ", err))
  // }

  return (
    <div>
      <Link to="/" className="btn  btn-primary mr-2">Home</Link>
      <Link to="/new" className="btn  btn-secondary">New</Link>
      <div className="row">
        <div className="col">
          <div className="card mt-4">
            <div className="card-header bg-dark">
              <h3 className="text-light">{restaurant.name} </h3>
            </div>
            <div className="card-body">
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Year Established: {restaurant.year} </p>
              <p>Description: {restaurant.desc}</p>
            </div>
            {/* <div className="card-footer">
              <Link to={'/'} className="btn btn-primary mr-3">Go back!</Link>
              <Link to={`/restaurants/update/${props._id}`} className="mr-3 btn btn-info">Edit</Link>
              <button to={`/restaurants/delete/${props._id}`} onClick={() => { deleteThisItem(restaurants._id) }} className="btn btn-danger">remove</button>
            </div> */}
          </div>
          <div className="card mt-5">
            <div className="card-header bg-dark">
              <h3 className="text-light">Create Review</h3>
            </div>
            <div className="card-body">
              <form onSubmit={addReview}>
                <div className="row">

                  <div className="col">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)} />
                      <p className="text-danger">{errors.name ? errors.name.message : ""}</p>
                    </div>
                    <div className="form-group">
                      <label>Comment</label>
                      <input type="text" name="comment" className="form-control" onChange={e => setComment(e.target.value)} />
                      <p className="text-danger">{errors.comment ? errors.comment.message : ""}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Rating</label>
                      <select className="form-control" name="rating" onChange={e => setRating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <button className="btn btn-primary" type="submit">add review</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header bg-dark">
              <h3 className="text-light" >All Reviews</h3>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {
                  restaurant.review.map(rev =>
                    <li className="list-group-item" key={rev.id}>
                      <p>Rating: {rev.rating} </p>
                      <p><strong>{rev.nameR} says: </strong> {rev.comment}</p>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RestaurantInfo
