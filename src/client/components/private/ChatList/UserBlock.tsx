import * as React from 'react';
import { useEffect, useState } from 'react';
import { json, User } from '../../../utils/api';
import { IActiveChats } from './types';
import BlockContent from './BlockContent';



interface IUserInfo {
    id: number,
    email: string,
    firstname: string,
    lastname: string;
}

const UserBlock = (props: IAppProps) => {

    const {chat} = props;
    const [recipient, setRecipient] = useState<IUserInfo>();

    const getRecipient = async(dChat: IActiveChats) => {
        let recipientId: number = null;
        dChat.userid_1 == User.userid ? recipientId = dChat.userid_2 : recipientId = dChat.userid_1;
        try {
            let getRecipient = await json(`/api/users/by_id/${recipientId}/${User.userid}`);
            setRecipient(getRecipient[0]);
        } catch (e) {
            console.log(e);
        }

    }
  

	useEffect(() => { 
		(async() => {
            getRecipient(chat);
		})();
    }, []);

    if(!recipient) {
        return <></>;
    } else {
        return <BlockContent chat={chat} recipient={recipient} />;
    }
    
    


}

interface IAppProps {
    chat: IActiveChats;
}

export default UserBlock;
