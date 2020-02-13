import React,{Component} from 'react';
import Navbar from './pages/Navbar';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import NavbarWithUser from './pages/NavbarWithUser'
import fire from './config/firebase'
import './App.css';

class App extends Component{

  constructor(props) {
      super(props);
      this.state = {
          user:{},
      }
    }

  componentDidMount(){
      this.authListener();
  }

  authListener(){
      fire.auth().onAuthStateChanged((user) => {
          if (user){
              this.setState({ user });
          }else{
              this.setState({user:null});
          }
      })
  }


  render(){

      var user = fire.auth().currentUser;

      if(user){
          return(<div><NavbarWithUser/></div>);
      }

      return(
          <div>
              {(<Navbar user = {user}/>)}
          </div>
      );

      
  }
}

export default App;
