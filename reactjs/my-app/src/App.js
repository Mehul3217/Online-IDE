import React,{ Component } from 'react';
import './App.css'
import Navbar from './components/navbar.component'
import Home from './components/home.component'
import Company from './components/company.component'
import Topics from './components/topics.component'
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br/>
        <Home />
        <br/>
        <Company/>
        <br/>
        <Topics />
      </div>
    )
  }
}

export default App;