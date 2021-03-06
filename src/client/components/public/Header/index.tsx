import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';


const Header = (props: AppProps) => {
        const { isLoggedIn } = props;

        const loginRegisterButtons = () => {
                return (
                        <>
                                <Link to={'/login'} className="btn btn-secondary ml-1 mr-1 btn-outline-dark shadow aFont">Login</Link>
                                <Link to={'/register'} className="btn btn-secondary ml-1 mr-1 btn-outline-dark shadow aFont">Register</Link>
                        </>
                );
        }

        const profileButton = () => {
                return <></>;
        }

        return (
                <nav className="navbar navbar-info bg-info mb-3 d-flex justify-content-between shadow rounded">
                        <h2>Chatroom</h2>
                        <div>
                                <Link to={'/'} className="btn btn-secondary ml-1 mr-1 btn-outline-dark shadow aFont">Home</Link>
                                {!isLoggedIn ? loginRegisterButtons() : profileButton()}
                        </div>
                </nav>
	);
}


interface AppProps {
        isLoggedIn: boolean;
}

export default Header;
