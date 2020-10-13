import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/logos/logo.png'
const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); //------- global logged in user

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-expand-md navbar-light pt-2 font-weight-bold">
                <Link class="navbar-brand" to="/">
                    <img src={logo} height="70" alt="" />
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mt-2">
                        <li class="nav-item ">
                            <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Our Portfolio</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Our Team</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Contact Us</Link>
                        </li>
                        {
                            loggedInUser.email
                                ?
                                <>
                                    <li class="nav-item d-flex">
                                        <Link class="nav-link " to="/user"> {loggedInUser.displayName} </Link>
                                    </li>
                                    {
                                        loggedInUser.access === 'admin'
                                        &&
                                        <li class="nav-item d-flex">
                                            <Link class="nav-link " to="/admin"> Admin Panel </Link>
                                        </li>
                                    }
                                    <li class="nav-item">
                                        <Link class="nav-link " to="/logout">Log Out</Link>
                                    </li>
                                </>
                                :
                                <li class="nav-item">
                                    <Link class="nav-link" to="/login">
                                        <button className="brand-dark-btn mt-n2">Log In</button>
                                    </Link>
                                </li>
                        }

                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;