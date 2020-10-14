import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import AdminPanelLayOut from './AdminPanelLayOut';

const SecuredForAdminPage = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); //------- global logged in user
    const history = useHistory();
    
    useEffect(()=>{
        if(loggedInUser.access !== 'admin'){
            alert('Authorization failed! Admin dashboard is highly secured. Please click "Admin Panel" button from navigation bar. ')
            history.replace('/')
        }
    },[])

    return (
        <div>
            {
                loggedInUser.access === 'admin' 
                &&
                <AdminPanelLayOut/> 
            }
        </div>
    );
};

export default SecuredForAdminPage;