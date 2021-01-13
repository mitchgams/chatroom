import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { User, isTokenValid } from '../utils/api';
import UserPanel from './private/UserPanel';
import Header from './public/Header/index';


const Home: React.FC = (props: AppProps) => {

    const history = useHistory();
    const [isAllowed, setIsAllowed] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async () => {
			if(User.userid === null) {
                history.push('/login');
            } else {
                setIsAllowed(true);
            }
            if(!(await isTokenValid())) {
                alert('You\'re account has been deleted please re-register')
                 history.push('/register');
            }
		})();
	}, []);

    if(!isAllowed) {
        return (
            <>
                <Header isLoggedIn={isAllowed} />
                <div className="card border-dark shadow">
                    <h4 className="card-header bg-info">Welcome to the Chat Room</h4>
                    <p className="card-body">Please login to continue.</p>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header isLoggedIn={isAllowed} />
                <UserPanel isLoggedIn={isAllowed} />
            </>
        );
    }
    
}

interface AppProps {}

export default Home;
