import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router';
import './App.css';
import RestaurantList from './Components/RestaurantList';
import ResturantForm from './Components/ResturantForm';
import RestaurantEdit from './Components/RestaurantEdit';
import RestaurantInfo from './Components/RestaurantInfo';

function App() {
  return (
    <div className="container mt-3">
      <h2><span className="text-primary">REST</span>aurant</h2>
      <Router>
      <RestaurantList path="/" />
      <ResturantForm  path="/new" />
      <RestaurantEdit path="/edit/:_id" />
      <RestaurantInfo path="/view/:_id" />
      </Router>
    </div>
  );
}

export default App;
