import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import FirstLanding from './components/FirstLanding'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Register from './pages/Register'

import './App.css';

function App() {
  return (
    <div>
    <Navbar/>
    
    <Router>

    <div>
      <Route exact path="/" component={FirstLanding} />
      {/*<Route path="/login" component={Login} />*/}

      <Route path="/register" component={Register} />
      {/* <Route path='/AboutUs' component={AboutUs} /> */}
    </div>

    </Router>
    <Footer id='Footer'/>
    </div>
  );
}

export default App;
