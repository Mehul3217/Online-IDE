import React from 'react'; 
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/home.component'

function App() {
  return (
    <Router>
      <div className="container">
          <Route path="/" exact component={Home} />
      </div>
    </Router>
  );
}

export default App;