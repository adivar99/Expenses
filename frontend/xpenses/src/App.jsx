import {makeStyles, Route, Switch, NavBar} from './component';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { setAuthToken } from './auth/authDispatcher';
import GuardedRoute from './shared/GuardedRoute';
import Register from './auth/Register';
import ConfirmMessageComponent from "./shared/confirm/confirm-message-component";
import LoadingIndicatorComponent from './shared/loader/loading-indicator-component';
import Login from './auth/Login';
import { Redirect } from 'react-router-dom';
import AppNotificationComponent from './shared/notification/app-notification-component';
import Profile from './profile/Profile';
import Dashboard from './dashboard/Dashboard';

const useStyles = makeStyles((theme) => ({

    '@global': {
      body: {
        backgroundColor: '#e6e6e6'
      },
      footer:{
        marginTop:'calc(5% + 60px)',
        bottom: 0
      }
    },
    footer:{
      marginTop:'calc(5% + 60px)',
      bottom: 0
    }
  
  
}));

function App() {
    const classes = useStyles();
    const {user, token, isLoggedIn} = useSelector(state => state.auth);

    const auth = (user, token, isLoggedIn)

    let homePage = "/login"

    if(isLoggedIn)
        homePage = "/profile"
    
    useEffect(() => {
        if(token && user){
            setAuthToken(token)
        }
    }, [token]);

    return (<React.Fragment>
        <LoadingIndicatorComponent></LoadingIndicatorComponent>
        <NavBar />
        <ConfirmMessageComponent />
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <GuardedRoute path="/profile" component={Profile} auth={isLoggedIn} />
            <GuardedRoute path="/dashboard" component={Dashboard} auth={isLoggedIn} />
            <Route path="/">
                <Redirect to={homePage} />
            </Route>
        </Switch>
        <AppNotificationComponent/>
    </React.Fragment>
    );
}

export default App;