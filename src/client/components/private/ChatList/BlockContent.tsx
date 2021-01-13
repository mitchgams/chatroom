import * as React from 'react';
import { useEffect, useState } from 'react';
import { json, User } from '../../../utils/api';
import { IChatLastMessage, IUserInfo, IActiveChats } from './types';
import moment from 'moment';



const BlockContent = (props: IProps) => {

    const { chat , recipient } = props;

    const [lastMsg, setLastMessage] = useState<IChatLastMessage[]>([]);

    const getData = async () => {
        let results = await json(`/api/chats/last_message/${chat.chatid}/${User.userid}`);
        setLastMessage(results);
    }

	useEffect(() => {
		(async() => {
            await getData(); 
		})();
    }, []);

    if(lastMsg.length === 0) {
        return (
            <a key={chat.chatid} href={`/chat_window/${chat.chatid}`} className="list-group-item list-group-item-action bg-light" aria-current="true">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Chat: {chat.title}</h5>
                <small>Chat created: {moment(chat.created).utc().format('MMM Do YYYY')}</small>
            </div>
            <p style={{fontSize: '12px'}}>Chat between you and {recipient.firstname} {recipient.lastname} currently has no messages.</p>
        </a>
        );
    } else {
        return (
            <a key={chat.chatid} href={`/chat_window/${chat.chatid}`} className="list-group-item list-group-item-action bg-light" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Chat: {chat.title}</h5>
                    <small>Last message sent: {moment(lastMsg[0].created).utc().format('MMM Do YYYY')}</small>
                </div>
                <p style={{fontSize: '12px'}}><b>{lastMsg[0].firstname} {lastMsg[0].lastname}:</b> {lastMsg[0].text}</p>
            </a>
        );
    }
}
interface IProps {
    chat: IActiveChats;
    recipient: IUserInfo;
}


export default BlockContent;
