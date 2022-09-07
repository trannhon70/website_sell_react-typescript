import React from 'react';
import {  Navigate } from 'react-router-dom';
import { auth } from '../../../Firebaselogin/firebase';
import logging from '../../../Firebaselogin/logging';


export interface IAuthRouteProps {
    children:any
 }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    if (!auth.currentUser)
    {
        logging.warn('No user detected, redirecting');
        return <Navigate to="/login" />
    }

    return (
        <div>{children}</div>
    );
}

export default AuthRoute;