import * as React from 'react';
import { useEffect, useState } from 'react';
import { json, User } from '../../../utils/api';
import ChatLists from './ChatLists';
import { IActiveChats, IUsers } from './types';



const ActiveChats = (props: any) => {

    const [activeChats, setActiveChats] = useState<IActiveChats[]>([]);

    const getData = async () => {
        let results = await json(`/api/chats/user_chats/${User.userid}`);
        setActiveChats(results);
    }

	useEffect(() => {
		(async() => {
            await getData(); 
		})();
    }, []);

    if(!activeChats) {
        return <>loading</>;
    } else {
        return (
            <div className="card mr-3" style={{border: 'none'}}>
                <h6 className="card-header bg-info">Active Chats: </h6>
                <div style={{height: '70vh', width: '40vw', overflow: 'auto', padding: '0'}}>
                    <div className="list-group bg-light">
                        <ChatLists activeChats={activeChats} />
                    </div>
                </div>
            </div>
        );
    }
}


export default ActiveChats;
