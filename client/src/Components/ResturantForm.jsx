import React, { useState } from 'react'
import { Link, navigate } from '@reach/router';
import axios from 'axios'

const ResturantForm = () => {
  const [name, setName] = useState("")
  const [year, setYear] = useState(0)
  const [cuisine, setCuisine] = useState("")
  const [desc, setDesc] = useState("")
  const [errors, setErrors] = useState({});

  const addNewRestaurant = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/restaurants/new', {
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
    setDesc("")
    setYear(1720)
    setName("")
    setCuisine("")
  }

  return (
    <div>
      <Link to="/" className="btn  btn-primary">Home</Link>
      <div className="card mt-4 ">
        <div className="card-header bg-dark">
          <h3 className="text-light">Add Restaurant</h3>
        </div>
        <div className="card-body">
          <form onSubmit={addNewRestaurant}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" className="form-control" onChange={e => setName(e.target.value)} value ={name} />
              <p className="text-danger">{errors.name ? errors.name.message : ""}</p>
            </div>
            <div className="row justify-content-around">
              <div className="col">

                <div className="form-group">
                  <label>Cuisine</label>
                  <input type="text" name="cusine" className="form-control" onChange={e => setCuisine(e.target.value)} value={cuisine} />
                  <p className="text-danger">{errors.cuisine ? errors.cuisine.message : ""}</p>
                </div>
              </div>
              <div className="col">

                <div className="form-group">
                  <label>Year Established</label>
                  <input type="number" name="year" className="form-control" onChange={e => setYear(e.target.value)} value={year} />
                  <p className="text-danger">{errors.year ? errors.year.message : ""}</p>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="desc" className="form-control" onChange={e => setDesc(e.target.value)} value={desc} />
              <p className="text-danger">{errors.desc ? errors.desc.message : ""}</p>
            </div>
            <button type="submit" className="btn btn-block btn-primary">Add Restaurant</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResturantForm
