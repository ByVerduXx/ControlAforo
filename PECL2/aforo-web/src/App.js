import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Navigationbar from './components/Navigationbar/Navigationbar';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Notify from './pages/Notify/Notify'

import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <div className="body">
        <Router>
          <Navigationbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/profile/:username' component={Home} />
            <Route path='/notify' component={Notify} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
