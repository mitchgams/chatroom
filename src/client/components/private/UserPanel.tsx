import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import Header from '../public/Header';
import UserList from './UserList';
import ActiveChats from './ChatList/index';



const UserPanel = (props: AppProps) => {

	const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);
	const { isLoggedIn } = props;


	useEffect(() => {
		(async () => {
			if(needsRefresh) setNeedsRefresh(false);
		})();
	}, []);

	const doRefresh = () => {
		console.log('ok refresh');
		setNeedsRefresh(true);
	}

	
	return (
		<>
			<div className="container d-flex justify-content-start">
				<div style={{width: '100%'}} className="row">
				<div className="col-sm-12 col-md-5"><UserList /></div>
				<div className="col-sm-12 col-md-7"><ActiveChats /></div>
				</div>
			</div>
		</>
	);
}

interface AppProps {
	isLoggedIn: boolean;
}

export default UserPanel;
