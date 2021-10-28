import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navigationbar from './components/Navigationbar/Navigationbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="body">
      <Router>
        <Navigationbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile/:username' component={Home} />
          <Route path='/notify' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
