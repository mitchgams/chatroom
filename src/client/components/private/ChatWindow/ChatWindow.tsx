import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { json, User } from '../../../utils/api';
import { IActiveChats, IChatLastMessage } from '../ChatList/types';
import Messages from './Messages';
import './styles.scss'; 
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { JsxElement } from 'typescript';

export interface IUseParams {
    chatid: string;
}

interface IUserInfo {
    id: number,
    email: string,
    firstname: string,
    lastname: string;
}

const ChatWindow = (props: any) => {

    const [chat, setChat] = useState<IActiveChats>();
    const [messages, setMessages] = useState<IChatLastMessage[]>([]);
    const [recipient, setRecipient] = useState<IUserInfo>();
    const [messageToSend, setMessageToSend] = useState<string>('');
    const [errorMessage, setError] = useState<JSX.Element>();

    let myInput = useRef();


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
            try {
                let chats = await json(`/api/chats/get_chat/${props.chatid}/${User.userid}`);
                setChat(chats[0]);
                let msgs = await json(`/api/chats/get_messages/${props.chatid}/${User.userid}`);
                setMessages(msgs);
                getRecipient(chats[0]);
            } catch(e) {
                console.log(e);
            }

        })();
    }, [props.chatid]);

    const handleSend = async() => {
        setError(<></>);
        if(messageToSend.length === 0) return;
        try {
            let post = await json('/api/chats/send_message/' + User.userid, 'POST', {userid: User.userid, chatid: props.chatid, message:messageToSend});
            if(post.status === 'complete') {
                setMessageToSend('');
            } else if(post.status === 'fail') {
                console.log('Message failed to send.');
                setError(<div className="alert alert-danger">Message failed to send.</div>);
            }
        } catch(e) {
            console.log(e);
        }
    }

    if(chat && recipient && messages) {
        return (
            <div className="card col-sm-5" style={{border: 'none'}}>
                <div className="card-header bg-info aFont">Messages:</div>
            <div className="col-sm-12  frame" style={{border: 'none'}}>
            <ul>
                <Messages />
            </ul>
            <div>
                <div className="msj-rta macro d-flex" style={{margin: 'auto'}}>                        
                    <div className="text text-r" style={{background: 'whitesmoke !important'}}>
                        <input className="mytext" value={messageToSend} onChange={e => setMessageToSend(e.target.value)} placeholder="Type a message" />
                    </div> 
                    <button onClick={handleSend} className="btn btn-secondary aFont">Send</button>
                </div>
            </div>
        </div>  
        {errorMessage}      
        </div>
        );
    } else {
        return <ClipLoader color={"#000000"} loading={true} css={""} size={50} />;
    }
};

export default ChatWindow;
