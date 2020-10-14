import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../../images/logos/logo.png';
import google from '../../../images/logos/googleLogo.png';
import { UserContext } from '../../../App';
import { googleSignIn, initializeFirebaseLogin } from './LoginManager';
import './LoginStyle.css';

const Login = () => {
    initializeFirebaseLogin();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); //------- global logged in user
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }

    if(loggedInUser.email !== ''){
        history.replace(from)
    }

    const whoAreYou=(res)=>{
        fetch(`http://localhost:3001/checkingWhoYouAre` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: res.email})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.person === 'admin') {
                    res.access = 'admin';
                    window.alert("Welcome Mr. Admin")
                }else{
                    res.access = 'user'
                }
                setLoggedInUser(res)
            })
    }

    const handleResponse = (res, redirect) => { //---------------- Handle response from firebase
            whoAreYou(res);
            redirect && history.replace(from);
    }

    const googleSignInClick = () => {
        googleSignIn()
            .then(res => {
                res && handleResponse(res, true);
            })
    }
    
    return (
    
        <div>
            <div className="login d-flex justify-content-center">
                <div className="row">
                    <div className="my-4">
                        <Link to="/"><img src={logo} height="70" alt="" /></Link>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center my-5" style={{height:'300px'}}>
                <div className="card mt-5 p-5 d-flex justify-content-center align-items-center" >
                    <div className="card-body ">
                        <h3>Login With</h3>
                    </div>
                    <div className="social-login px-3 py-2 ">
                        <button className="button " onClick={googleSignInClick}>
                            <img src={google} height="25" alt="" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Continue with Google
                            </button>
                    </div>
                    <br/>
                    <p className="text-center">Don't have an account? <br/> <Link onClick={googleSignInClick} to="#">Create an account</Link> </p>
                </div>

            </div>
        </div>
    );
};

export default Login;