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
            alert("Admin authorization failed!")
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