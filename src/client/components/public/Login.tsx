import * as React from 'react';
import { json, SetAccessToken, User } from '../../utils/api';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

interface IAppProps {}

interface IUser {
    email: string,
    password: string;
}

const Login: React.FC = (IAppProps) => {

    const [user, setUser] = React.useState<IUser>({email: '', password: ''});
    const [loginError, setLoginError] = React.useState<any>(null);
    
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

    const handleLogin = async() => {
        try {
            if(!user.email || !user.password) return setLoginError(<div className="alert mt-3 alert-danger">* Please fill out all fields to continue.</div>);
            let results = await json('/auth/login', 'POST', user);
            if(results) {
                SetAccessToken(results.token, { userid: results.userid, role: results.role, email: results.email, firstname: results.firstname, lastname: results.lastname });
                history.push('/');
            } else {
                setLoginError(<div className="alert mt-3 alert-danger">* Email/Password is incorrect.</div>)
            }
        } catch (e) {
            throw e;
        }
    }


    return (
        <>
        <Header isLoggedIn={isLoggedIn} />
        <section className="card border-dark shadow">
            <h5 className="card-header bg-info border-dark aFont">Login</h5>
            <div className="card-body bg-light border-dark shadow-sm">
                <label htmlFor="email">Email: </label><input type="email" name="email" onChange={handleChange} className="input-group"/>
                <label htmlFor="password">Password: </label><input type="password" name="password" onChange={handleChange} className="input-group"/>
                {loginError}
                <p>Don't have an account? <Link to={'/register'}>Register an account.</Link></p>
            </div>
            <div className="card-footer bg-info p-1 border-dark d-flex justify-content-end">
                <button onClick={handleLogin} className="btn btn-secondary btn-outline-dark shadow aFont">Login</button>
            </div>
        </section>
        </>
    );
}

export default Login;  