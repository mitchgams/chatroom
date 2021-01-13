import * as React from 'react';
import { json, SetAccessToken, User } from '../../utils/api';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { validate } from 'validate.js';
import * as Constraints from '../../utils/constrains';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';

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
        const isValidInput = await validate(user, Constraints.constraints);
        if(isValidInput !== undefined) {
            const keys = Object.keys(isValidInput);
            let buildError: string = '';
            keys.forEach((key: string) => {
                if(isValidInput[key].length === 2) {
                    buildError = buildError + `<p>* ${isValidInput[key][0]}</p><p>* ${isValidInput[key][1]}</p>`;
                }
                buildError = buildError + `<p>* ${isValidInput[key][0]}</p>`;
            });
            setRegisterError(<div className="alert mt-3 alert-danger">{ReactHtmlParser(buildError)}</div>);
        } else {    
            try {
                let results = await json('/auth/register', 'POST', user);
                if(results.status === 'duplicate_email') {
                    setRegisterError(<div className="alert mt-3 alert-danger">* Email entered is already associated with a different account.</div>);
                } else if(results.code === 500) {
                    setRegisterError(<div className="alert mt-3 alert-danger">* Something went wrong.</div>);
                } else {
                    console.log(results)
                    SetAccessToken(results.token, { userid: results.userid, role: results.role, email: results.email, firstname: results.firstname, lastname: results.lastname });
                    history.push('/');
                }
            } catch (e) {
                throw e;
            }
        }
    }


    return (
        <>
        <Header isLoggedIn={isLoggedIn} />
        <section className="card border-dark shadow">
            <h5 className="card-header bg-info border-dark aFont">Register</h5>
            <div className="card-body bg-light border-dark shadow-sm">
                <label htmlFor="email">Email: </label><input type="text" name="email" onChange={handleChange} className="input-group"/>
                <label htmlFor="password">Password: </label><input type="password" name="password" onChange={handleChange} className="input-group"/>
                <label htmlFor="firstname">First Name: </label><input type="text" name="firstname" onChange={handleChange} className="input-group"/>
                <label htmlFor="lastname">Last Name: </label><input type="text" name="lastname" onChange={handleChange} className="input-group"/>
                
                {registerError}
            </div>
            <div className="card-footer bg-info p-1 border-dark d-flex justify-content-end">
                <button onClick={handleRegister} className="btn btn-secondary btn-outline-dark shadow aFont">Register</button>
            </div>
        </section>
        </>
    );
}

export default Register;  
