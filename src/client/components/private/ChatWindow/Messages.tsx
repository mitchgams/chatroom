import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IChatLastMessage } from '../ChatList/types';
import { json, User } from '../../../utils/api';
import moment from 'moment';


const Messages = (props: AppProps) => {
	
    const [messages, setMessages] = useState<IChatLastMessage[]>([]);
    
    const { chatid } = useParams<any>();
    

    const getMessages = async(chat: any) => {
        let msgs = await json(`/api/chats/get_messages/${chat}/${User.userid}`);
        setMessages(msgs);
    }

    useEffect(() => {
        setInterval(async() => {
            getMessages(chatid);
       }, 500);
    }, [chatid]);

    if(messages.length === 0) {
        return <>Chat Empty</>; 
    } else {
        return (
            <>
                {messages?.map(msg => {
                    if(User.userid == msg.userid) {
                        return (
                            <li key={msg.id} style={{width: '100%'}}>
                                <div className="msj macro">
                                    <div className="text text-l">
                                        <p>Me: {msg.text}</p>
                                        <p><small>{moment(msg.created).startOf('hour').fromNow() }</small></p>
                                    </div>
                                </div>
                            </li>
                        );
                    } else {
                        return (
                            <li key={msg.id} style={{width: '100%', paddingRight: '20px'}}>
                                <div className="msj-rta macro">
                                    <div className="text text-r">
                                        <p>{msg.firstname} {msg.lastname}: {msg.text}</p>
                                        <p><small>{moment(msg.created).startOf('hour').fromNow() }</small></p>
                                    </div>
                                    <div className="avatar" style={{padding: '0px 0px 0px 10px !important'}}></div>
                                </div>
                            </li>
                        );
                    }
                })}
            </>
        );
    }
}

interface AppProps {
    chatid: any;
}

export default Messages;
