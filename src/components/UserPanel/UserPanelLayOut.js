import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logos/logo.png'
import Order from './Order/Order';
import OrderedList from './OrderedList/OrderedList';
import Review from './Review/Review';


const UserPanelLayOut = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext); //------- global logged in user
    const { service_name } = useParams();
    const currentLocation = useLocation()

    return (
        <div className="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-light ">
                <Link class="navbar-brand" to="/">
                    <img src={logo} height="70" alt="" />
                </Link>
                <div className="ml-auto">
                    <p> <img src={loggedInUser.profilePhoto} height="25" style={{ borderRadius: '50%' }} alt="" /> {loggedInUser.displayName}</p>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>


            </nav>

            <div className="container-fluid">
                <div className="row mx-2">
                    <div className="col-md-3 col-sm-6">
                        <div className="collapse navbar-collapse show" id="navbarSupportedContent">

                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <Link class="nav-link" to="/user">Order<span class="sr-only">(current)</span></Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/user/orderedList">Service List</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/user/review">Review</Link>
                                </li>
                            </ul>

                        </div>
                    </div>


                    <div className="col-md-9 col-sm-6">

                        {/* {
                            currentLocation.pathname === '/user/orderedList'
                            &&
                            <OrderedList email={loggedInUser.email}/>
                        }
                        {
                            currentLocation.pathname === '/user/review'
                            &&
                            <Review />
                        }
                        {
                            (currentLocation.pathname === '/user/'+service_name || currentLocation.pathname === '/user')
                            &&
                            <Order service_name={service_name} user={loggedInUser}/>
                        } */}


                        {
                            currentLocation.pathname === '/user/orderedList'
                                ?
                                <OrderedList email={loggedInUser.email} />
                                :
                                currentLocation.pathname === '/user/review'
                                    ?
                                    <Review image={loggedInUser.profilePhoto} />
                                    :
                                    (service_name !== 'orderedList' || service_name !== 'review'
                                        &&
                                        currentLocation.pathname === '/user/' + service_name
                                        || currentLocation.pathname === '/user'
                                    )
                                    &&
                                    <Order service_name={service_name} user={loggedInUser} />
                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanelLayOut;