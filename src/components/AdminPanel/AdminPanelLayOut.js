import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logos/logo.png'
import AddAdmin from './AddAdmin/AddAdmin';
import AddService from './AddService/AddService';
import AllOrderList from './AllOrderList/AllOrderList';

import serviceList from'../../images/icons/serviceList.png';
import plus from '../../images/icons/plus.png';
import makeAdmin from '../../images/icons/addAdmin.png';
import { UserContext } from '../../App';

const AdminPanelLayOut = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); //------- global logged in user
    let currentLocation = useLocation()

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-light ">
                <Link className="navbar-brand" to="/">
                    <img src={logo} height="70" alt="" />
                </Link>
                <div className="ml-auto">

                    <p> <img src={loggedInUser.profilePhoto} height="25" style={{ borderRadius: '50%' }} alt="" /> &nbsp; {loggedInUser.displayName}</p>
                    {/* <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                </div>


            </nav>

            <div className="container-fluid">
                <div className="row mx-2">
                    <div className="col-md-2 pt-3">

                        {/* collapse navbar-collapse show id="navbarSupportedContent*/}
                        <div className="" id="navbarSupportedContent">

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">
                                        <img src={serviceList} alt="" height="18"/> &nbsp;
                                        Service List<span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/addService">
                                    <img src={plus} alt="" height="18"/> &nbsp;
                                        Add Service
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/makeAdmin">
                                      <img src={makeAdmin} alt="" height="18"/>   &nbsp;
                                        Make Admin
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>

                    
                    <div className="col-md-10">
                        {
                            currentLocation.pathname === '/admin'
                            &&
                            <AllOrderList/>
                        }
                        {
                            currentLocation.pathname === '/admin/addService'
                            &&
                            <AddService/>
                        }
                        {
                            currentLocation.pathname === '/admin/makeAdmin'
                            &&
                            <AddAdmin/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanelLayOut;