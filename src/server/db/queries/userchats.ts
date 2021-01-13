import { Query } from '../index';

interface IChat {
    id: number,
    title: string,
    userid_1: number,
    userid_2: number,
    created: string,
    chatid: number,
    lastMSG: ILastMsg[];
}

interface ILastMsg {
    chatid: number,
    id: number,
    userid: number,
    firstname: string,
    lastname: string,
    text: string,
    created: string;
}

const getUsersChats = async(userid: number) => {
    let chats: IChat[] = await Query('SELECT * FROM users_chats u JOIN direct_chats d ON d.id = u.chatid WHERE u.userid = ?', [userid]);
    return chats;
}

export default {
    getUsersChats
}