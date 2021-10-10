import React, {Component, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import { getAuth, signOut } from '@firebase/auth';

function Dashboard ({history}){
    const logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('token')
                history.push('/')
            })
            .catch((e) => alert(e.message))
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            history.push('/')
        }
    },[])

    const auth = getAuth();
    const user = auth.currentUser;
    return(
        <Button variant = "primary" onClick={logout}/>
    )
}
export default Dashboard;