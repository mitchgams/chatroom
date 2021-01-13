import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useReducer } from 'react';
import { json, User } from '../../utils/api';

interface IUsers {
    id: number,
    email: string,
    firstname: string,
    lastname: string
}
interface IAppProps {
    refresh: any;
}
const UserList = (props: any) => {

    const [users, setUsers] = useState<IUsers[]>([]);
    const history = useHistory();

    useEffect(() => {
        (async() => {
            try {
                let results = await json(`/api/users/${User.userid}`);
                setUsers(results);
            } catch (e) {
                console.log(e);
            }
        })();

    }, []);

    const handleNewChat = async(recipientid: number , event: any) => {
        event.preventDefault();
        let result = await json(`/api/chats/check_chat_exists/${recipientid}/${User.userid}/${User.userid}`);
        if(result.chat_exists) {
            alert('Chat Already Exists');
        } else {
            let chatTitle = prompt("Please enter a title for the chat.", "Title");
            if(chatTitle === null || chatTitle === "") {
                // Canceled 
            } else {
                try {
                    let createChat = await json(`/api/chats/create_chat/${User.userid}`, 'POST', {userid: User.userid, recipientid: recipientid, title: chatTitle});
                    if(createChat.status === 'complete') {
                        console.log('chat created');
                        location.reload();
                    } else if(createChat.status === 'fail') {
                        // new chat failed
                        console.log('chat failed')
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }

    }
    if(!users) {
        return <h5></h5>
    } else {
        return (
            <div className="card mr-3 mb-3 bg-light" style={{border: 'none'}}>
                <h6 className="card-header bg-info aFont">Users:</h6>
                <div style={{height: '', width: '100%', overflow: 'auto', border: '0px solid black', padding: '0'}}>
                    <ul className="list-group bg-light">
                    {users?.map(user => {
                        if(parseInt(User.userid) !== user.id) {
                            return (
                                <li className="list-group-item bg-light" key={user.id}>
                                    <a onClick={() => handleNewChat(user.id, event)} style={{textDecoration: 'none', color: 'black'}} href=''>
                                        {user.firstname} {user.lastname}
                                    </a>
                                </li>
                            );
                        }
                    })}
                    </ul>
                </div>
            </div>
        );
            }
}

export default UserList;