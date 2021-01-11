import { Query } from '../index';

const getMessagesForChat = async(chatid: number) => Query('SELECT m.id, m.userid, m.chatid, m.text, m.created, u.firstname, u.lastname  FROM messages m JOIN users u ON m.userid = u.id WHERE m.chatid = ? ORDER BY m.created ASC', [chatid]);

const getLastMessage = async(chatid: number) => {
    let messages = await Query('SELECT m.id, m.userid, m.chatid, m.text, m.created, u.firstname, u.lastname  FROM messages m JOIN users u ON m.userid = u.id WHERE m.chatid = ? ORDER BY m.created DESC', [chatid]);
    return messages[0];
}

const postMessage = async(userid: number, chatid: number, message: string) => {
    return Query('INSERT INTO messages (userid, chatid, text) VALUES (?, ?, ?)', [userid, chatid, message]);
}


export default {
    getMessagesForChat,
    getLastMessage,
    postMessage
}