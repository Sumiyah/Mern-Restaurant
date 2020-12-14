import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
// if we submit with an error the things with be blank! - to change? maybe /?

const RestaurantEdit = props => {
  const [name, setName] = useState("")
  const [year, setYear] = useState(0)
  const [cuisine, setCuisine] = useState("")
  const [desc, setDesc] = useState("")
  const [errors, setErrors] = useState({});
  const [restaurant, setRestaurant] = useState({ review: [] })

  useEffect(() => {
    axios.get(`http://localhost:8000/api/restaurants/${props._id}`)
      .then(res => {
        console.log("RESPONSE in res edit:", res);
        setRestaurant(res.data.restaurant)
        setDesc(restaurant.desc)
        setYear(restaurant.year)
        setName(restaurant.name)
        setCuisine(restaurant.cuisine)
        // console.log(res.data)
        // console.log(restaurant)
      })
      .catch(err => console.log(err))
  }, [props._id])

  const updateRestaurant = e => {
    e.preventDefault()
    axios.put('http://localhost:8000/api/restaurants/update/' + props._id, {
      name,
      year,
      cuisine,
      desc
    })
      .then(res => {
        console.log("respone:  ", res)
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
        
      })
      .catch(err => console.log("Error: ", err))
  }

  return (
    <div>
      <Link to="/" className="btn  btn-primary">Home</Link>
      <Link to="/new" className="btn  btn-secondary">New</Link>
      <div className="card mt-4">
        <div className="card-header">
          <h3>Edit Restaurant</h3>
        </div>
        <div className="card-body">
          <form onSubmit={updateRestaurant}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)} defaultValue={restaurant.name} />
              <p className="text-danger">{errors.name ? errors.name.message : ""}</p>
            </div>
            <div className="row justify-content-around">
              <div className="col">

                <div className="form-group">
                  <label>Cuisine</label>
                  <input type="text" name="cusine" className="form-control" onChange={e => setCuisine(e.target.value)} defaultValue={restaurant.cuisine} />
                  <p className="text-danger">{errors.cuisine ? errors.cuisine.message : ""}</p>
                </div>
              </div>
              <div className="col">

                <div className="form-group">
                  <label>Year Established</label>
                  <input type="number" name="year" className="form-control" onChange={e => setYear(e.target.value)} defaultValue={restaurant.year} />
                  <p className="text-danger">{errors.year ? errors.year.message : ""}</p>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="desc" className="form-control" onChange={e => setDesc(e.target.value)} defaultValue={restaurant.desc} />
              <p className="text-danger">{errors.desc ? errors.desc.message : ""}</p>
            </div>
            <button type="submit" className="btn btn-block btn-primary">Update Restaurant</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RestaurantEdit
