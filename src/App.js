import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/layout/navBar";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar/>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
