import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { json, User } from '../../../utils/api';
import ChatWindow from './ChatWindow';
import ActiveChats from '../ChatList/index';
import Header from '../../public/Header';


const UserPanel = () => {
	const { chatid } = useParams<any>();
	const [isAllowed, setIsAllowed] = React.useState<boolean>(false);
	const history = useHistory();
	
	React.useEffect(() => {
		(async () => {
			if(User.userid === null) {
                history.push('/login');
            } else {
                setIsAllowed(true);
            }
		})();
	}, []);

    return (
		<>
		<Header isLoggedIn={isAllowed} />
		<div className="container d-flex justify-content-start">
			<div style={{width: '100%'}} className="row">
				<div className="col-sm-12 col-md-5"><ActiveChats /></div>
				<div className="col-sm-12 col-md-7"><ChatWindow chatid={chatid}/></div>
			</div>
		</div>
		</>
	);
}
	

export default UserPanel;
