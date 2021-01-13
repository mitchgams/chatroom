import * as React from 'react';
import { useEffect, useState } from 'react';
import { json, User } from '../../../utils/api';
import ChatLists from './ChatLists';
import { IActiveChats, IUsers } from './types';

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";



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
        return <ClipLoader color={"#000000"} loading={true} css={""} size={50} />;
    } else {
        return (
            <div className="card mr-3 mb-3 w-100" style={{border: 'none'}}>
                <h6 className="card-header bg-info aFont">Active Chats: </h6>
                <div style={{height: '600px', width: '100%', overflow: 'auto', padding: '0'}}>
                    <div className="list-group bg-light">
                        <ChatLists activeChats={activeChats} />
                    </div>
                </div>
            </div>
        );
    }
}


export default ActiveChats;
