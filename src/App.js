import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/AppLayOut/LandingPage/LandingPage';
import Login from './components/Authentication/Login/Login';
import UserPanelLayOut from './components/UserPanel/UserPanelLayOut';
import * as firebase from "firebase/app";
import "firebase/auth";
import { initializeFirebaseLogin } from './components/Authentication/Login/LoginManager';
import LogOut from './components/Authentication/Login/LogOut';
import SecuredForAdminPage from './components/AdminPanel/SecuredForAdminPage';
import UserPrivateRoute from './components/Authentication/PrivateRoute/UserPrivateRoute';

export const UserContext = createContext();

function App() {

    initializeFirebaseLogin()

    const [loggedInUser, setLoggedInUser] = useState({
        isLogIn: false,
        displayName: '',
        photo: '',
        email: ''
    }); //------- global logged in user


    const whoAreYou = (res) => {
        fetch(`http://localhost:3001/checkingWhoYouAre`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: res.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.person === 'admin') {
                    res.access = 'admin';
                    window.alert("Welcome Mr. Admin")
                } else {
                    res.access = 'user'
                }
                setLoggedInUser(res)
            })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const userInfo = {
                    displayName: user.displayName,
                    email: user.email,
                    profilePhoto: user.photoURL
                }
                if (userInfo.email) {
                    whoAreYou(userInfo)
                }
            } else {
                // No user is signed in.
            }
        });
    }, [])



    return (
        <div className="App">
            <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
                <BrowserRouter>
                    <Switch>

                        <Route exact path="/"> <LandingPage /> </Route>

                        <Route path="/login"><Login /></Route>
                        <Route path="/logout"> <LogOut /> </Route>

                        <Route path="/admin"> <SecuredForAdminPage /> </Route>

                        <UserPrivateRoute path="/user/:service_name"> <UserPanelLayOut /> </UserPrivateRoute>
                        <UserPrivateRoute path="/user"> <UserPanelLayOut /> </UserPrivateRoute>

                        <Route path="*"> <h1 className="text center"> 404 <br /> Page Not Found </h1> </Route>
                    </Switch>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );
}

export default App;
