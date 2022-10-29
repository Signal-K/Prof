import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.css';
import { useHistory } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import Loading from '../components/loading';

import Sidebar from './SideBar Section/Sidebar';
import Body from './Body Section/Body';

/* If isLoggedIn is true, set the UserContext with user data -> Otherwise, set it to {user: null}
useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then(isLoggedIn => {
      return isLoggedIn ? magic.user.getMetadata().then(userData => setUser(userData)) : setUser({ user: null });
    });
}, []);  */

function Dashboard() {
    const history = useHistory();
    const [user] = useContext(UserContext);

    // Redirect to login page if not loading and no user found
    useEffect(() => {
        user && !user.loading && !user.issuer && history.push("/login");
    }, [user, history]);
    /*const [currentTime, setCurrentTime] = useState(0);
    const [planetTitle, setPlanetTitle] = useState('')

    // Pull content from Flask API
    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    }, [])

    // Fetch planets from Flask API
    useEffect(() => {
        fetch('/planets').then(res => res.json()).then(data => {
            setPlanetTitle(data.title);
        });
    }, [])*/

    return (
        /*<div className='App'>
            <header className='App-header'>
                <p>The current time is { currentTime }.</p>
                <p>Planets: { planetTitle }.</p>
            </header>
        </div> */
        <div className='container'>
            <Sidebar />
            <Body />
        </div>
    );
}

export default Dashboard;