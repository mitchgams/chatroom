import { use } from 'passport';
import { Query } from '../index';

const createDirectChat = async(userid: number, recipientid: number, title: string) => {
    let direct_c: any = await Query('INSERT INTO direct_chats (userid_1, userid_2, title) VALUES (?, ?, ?)', [userid, recipientid, title]);
    await Query('INSERT INTO users_chats (userid, chatid) VALUES (?, ?)', [userid, direct_c.insertId]);
    return Query('INSERT INTO users_chats (userid, chatid) VALUES (?, ?)', [recipientid, direct_c.insertId]);
}

const checkIfChatExistsBetweenUsers = async(userid: number, recipientid: number) => {
    let checkOne = await Query('SELECT * FROM direct_chats WHERE userid_1 = ? AND userid_2 = ?', [userid, recipientid]);
    if(checkOne.length === 0) {
        let checkTwo = await Query('SELECT * FROM direct_chats WHERE userid_1 = ? AND userid_2 = ?', [recipientid, userid]);
        if(checkTwo.length === 0) { 
            return false;
        } else return true;
    } else return true;
}

const getDirectChat = async(chatid: number) => {
    return Query('SELECT * from direct_chats WHERE id = ?', [chatid]);
}

const getChatUsers = async(chatid: number) => {
    let chat = await getDirectChat(chatid);
    let users = await Query('CALL chatUsers(?, ?)', [chat[0].userid_1, chat[0].userid_2]);
    users.pop();
    return users[0][0];
}



export default {
    createDirectChat,
    checkIfChatExistsBetweenUsers,
    getDirectChat,
    getChatUsers
}