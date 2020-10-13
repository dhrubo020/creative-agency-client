import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logos/logo.png'
import AddAdmin from './AddAdmin/AddAdmin';
import AddService from './AddService/AddService';
import AllOrderList from './AllOrderList/AllOrderList';

const AdminPanelLayOut = () => {
    let currentLocation = useLocation()

    return (
        <div className="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-light ">
                <Link class="navbar-brand" to="/">
                    <img src={logo} height="70" alt="" />
                </Link>
                <div className="ml-auto">
                    <p>User name</p>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>


            </nav>

            <div className="container-fluid">
                <div className="row mx-2">
                    <div className="col-md-2 bg-light">
                        <div className="collapse navbar-collapse show" id="navbarSupportedContent">

                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <Link class="nav-link" to="/admin">Service List<span class="sr-only">(current)</span></Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/admin/addService">Add Service</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/admin/makeAdmin">Make Admin</Link>
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