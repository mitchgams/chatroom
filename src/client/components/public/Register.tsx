import * as React from 'react';
import { json, SetAccessToken, User } from '../../utils/api';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

interface IAppProps {}

interface IUser {
    email: string,
    password: string,
    firstname: string,
    lastname: string;
}

const Register= () => {


    const [user, setUser] = React.useState<IUser>();
    const [registerError, setRegisterError] = React.useState<any>(null);
    
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const history = useHistory();

    React.useEffect(() => {
			if(User.userid !== null) {
                setIsLoggedIn(true);
            }
    }, [])

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    const handleRegister = async() => {
        try {
            if(!user.email || !user.password || !user.firstname || !user.lastname) return setRegisterError(<div className="alert mt-3 alert-danger">* Please fill out all fields to continue.</div>);
            if (user.password.length < 8) return setRegisterError(<div className="alert mt-3 alert-danger">* Please enter a password of at least 8 characters.</div>)
            let results = await json('/auth/register', 'POST', user);
            if(results.status === 'duplicate_email') {
                setRegisterError(<div className="alert mt-3 alert-danger">* Email entered is already associated with a different account.</div>);
            } else if(results.code === 500) {
                setRegisterError(<div className="alert mt-3 alert-danger">* Something went wrong.</div>);
            } else {
                SetAccessToken(results.token, { userid: results.userid, role: results.role, email: results.email, firstname: results.firstname, lastname: results.lastname });
                history.push('/');
            }
        } catch (e) {
            throw e;
        }
    }


    return (
        <>
        <Header isLoggedIn={isLoggedIn} />
        <section className="card border-dark shadow">
            <h5 className="card-header bg-info border-dark">Register</h5>
            <div className="card-body bg-light border-dark shadow-sm">
                <label htmlFor="email">Email: </label><input type="text" name="email" onChange={handleChange} className="input-group"/>
                <label htmlFor="password">Password: </label><input type="password" name="password" onChange={handleChange} className="input-group"/>
                <label htmlFor="firstname">First Name: </label><input type="text" name="firstname" onChange={handleChange} className="input-group"/>
                <label htmlFor="lastname">Last Name: </label><input type="text" name="lastname" onChange={handleChange} className="input-group"/>
                
                {registerError}
            </div>
            <div className="card-footer bg-info p-1 border-dark d-flex justify-content-end">
                <button onClick={handleRegister} className="btn btn-secondary btn-outline-dark shadow">Register</button>
            </div>
        </section>
        </>
    );
}

export default Register;  
