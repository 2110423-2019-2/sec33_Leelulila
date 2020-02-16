import React,{Component} from 'react';
import Navbar from './pages/Navbar';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import NavbarWithUser from './pages/NavbarWithUser'
// import fire from './config/firebase'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    
  }

  render(){
    return (
      <div>
      {<Navbar/>}
      </div>
    );
  }
    
}

export default App;
