import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';


const Header = (props: AppProps) => {
        const { isLoggedIn } = props;

        const loginRegisterButtons = () => {
                return (
                        <>
                                <Link to={'/login'} className="btn btn-secondary ml-1 mr-1 btn-outline-dark shadow">Login</Link>
                                <Link to={'/register'} className="btn btn-secondary ml-1 mr-1 btn-outline-dark shadow">Register</Link>
                        </>
                );
        }

        const profileButton = () => {
                return <></>;
        }

        return (
                <nav className="navbar navbar-info bg-info mb-3 d-flex justify-content-end shadow rounded">
                        <Link to={'/'} className="btn btn-secondary ml-1 mr-1 btn-outline-dark shadow">Home</Link>
                        {!isLoggedIn ? loginRegisterButtons() : profileButton()}
                </nav>
	);
}


interface AppProps {
        isLoggedIn: boolean;
}

export default Header;
