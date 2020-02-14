import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/layout/navBar";
import SignUp from "./components/auth/signUp";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar/>
                <Switch>
                    <Route path='/' component={Dashboard} />
                </Switch>
                <SignUp/>
            </div>
        </BrowserRouter>
    );
}

export default App;
