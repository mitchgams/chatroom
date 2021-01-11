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
			<ActiveChats />
			<ChatWindow chatid={chatid}/>
		</div>
		</>
	);
}
	

export default UserPanel;
