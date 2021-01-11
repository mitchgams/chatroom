import * as React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { json, User } from '../../../utils/api';
import { IActiveChats } from './types';


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
    }, [chat]);

if(recipient) {
    if(chat.lastMSG.length === 1) {
        return (
            <a key={chat.chatid} href={`/chat_window/${chat.chatid}`} className="list-group-item list-group-item-action bg-light" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Chat: {chat.title}</h5>
                    <small>Last message sent: {moment(chat.lastMSG[0].created).utc().format('MMM Do YYYY')}</small>
                </div>
                <p style={{fontSize: 12}} className="mb-1">{chat.lastMSG[0].firstname} {chat.lastMSG[0].lastname}: {chat.lastMSG[0].text}</p>
            </a>
            );
    } else {
        return (
            <a key={chat.chatid} href={`/chat_window/${chat.chatid}`} className="list-group-item list-group-item-action bg-light" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Chat: {chat.title}</h5>
                    <small>Chat created: {moment(chat.created).utc().format('MMM Do YYYY')}</small>
                </div>
                <p style={{fontSize: 12}} className="mb-1">Chat between you and {recipient.firstname} {recipient.lastname} currently has no messages.</p>
            </a>
            );
        }
    } else return <>fucj</>;
    


}

interface IAppProps {
    chat: IActiveChats;
}

export default UserBlock;
