import * as React from 'react';
import { IActiveChats } from './types';
import UserBlock from './UserBlock';


const ChatLists = (props: AppProps) => {

    const activeChats: IActiveChats[]  = props.activeChats;


        return (<>
            {activeChats.map((chat: any) => {
                return <UserBlock key={chat.chatid} chat={chat} />;
            })}
            </>
        );
    
}

interface AppProps {
    activeChats: IActiveChats[];
}

export default ChatLists;
