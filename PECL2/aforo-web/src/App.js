import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Connector } from 'mqtt-react-hooks';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Navigationbar from './components/Navigationbar/Navigationbar';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Notify from './pages/Notify/Notify'
import NoPage from './pages/NoPage/NoPage'
import Profile from './pages/Profile/Profile';

import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    //<Connector brokerUrl="ws://192.168.187.128:9001">
      <UserContextProvider>
        <div className="body">
          <Router>
            <Navigationbar />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/profile/:username' component={Profile} />
              <Route path='/notify' component={Notify} />
              <Route component={NoPage} />
            </Switch>
          </Router>
        </div>
      </UserContextProvider>
    //</Connector>
  );
}

export default App;
