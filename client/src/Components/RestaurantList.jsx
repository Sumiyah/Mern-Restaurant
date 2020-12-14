import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from '@reach/router';

const RestaurantList = () => {

  const [restaurants, setRestaurants] = useState([])

  useEffect(()=>{
    getRestaurants()
  },[])

  function getRestaurants() {
    axios.get("http://localhost:8000/api/restaurants")
      .then(res => {
        console.log("RESPONSE:", res);
        setRestaurants(res.data)
      })
      .catch(err => console.log("Error: ", err))
  }


  const deleteMe = myiD => {
    axios.delete(`http://localhost:8000/api/restaurants/delete/${myiD}`)
    .then(response => {
      console.log(response)
      getRestaurants()

    })
  }

  return (
    <div>
      
        <Link to="/new" className="btn btn-outline-dark">New</Link>
      
      {
        restaurants.map((restaurant, i ) =>
        <div className="card mt-4" key={i}>
          <div className="card-header bg-dark">
            <h3 className="text-light" >{restaurant.name}</h3>
          </div>
          <div className="card-body">
            <div className="row">
            <div className="col-6">
              <p>Cuisine:{restaurant.cuisine} </p>
              <p>Year Established: {restaurant.year} </p>
              <p>Average Rating: </p>
            </div>
            <div className="col-6">
              <p>Description: {restaurant.desc} </p>
            </div>
            </div>
            <div className="row justify-content-around">
              <Link className="btn btn-sm btn-success" to={`/view/${restaurant._id}`}>View</Link>
              <Link className="btn btn-sm btn-secondary" to={`/edit/${restaurant._id}`} >Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={e=> deleteMe(restaurant._id)} >Delete</button>
            </div>
          </div>
        </div>
        )
      }
    </div>
  )
}

export default RestaurantList
