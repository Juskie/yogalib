import React, {Component} from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import PrivateRoute from "./components/auth/privateRoute";

import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/layout/navBar";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import firstAuthentication from "./components/userInformartions/firstAuthentication";



function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar/>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/signin' component={SignIn} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/userInformations' component={firstAuthentication} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}




export default App;
