import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './core/Layout.js';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup.js';
import './style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Signin from './Components/Signin.js';
import Activate from './Components/Activate.js';
import Private from './core/Private';
import PrivateRoute from './Components/PrivateRoute.js';
import Forgot from './Components/Forgot.js';
import Reset from './Components/ResetPassword.js';
import Profile from './Components/Profile.js';

const App= ()=>{
    return(
        <BrowserRouter>
        <Switch>
          <Route path = '/'  exact component={Home}/>
          <Route path = '/signup' exact component ={Signup}/>
          <Route path='/signin' exact component={Signin}/>
          <Route path='/auth/activate/:token' exact component={Activate}/>
          <PrivateRoute path='/private' exact component={Private}/>
          <Route path='/auth/password/forgot' exact component={Forgot}/>
          <Route path='/auth/password/reset/:token' exact component={Reset}/>
          <PrivateRoute path='/profile' exact component={Profile}/>
          
        </Switch>
    </BrowserRouter>
    )
}

export default App;