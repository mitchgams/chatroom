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

const buildLastMessage = (chats: IChat[]) => {
    return new Promise<Array<any>>(async(resolve, reject) => {
        let buildReturn: any[] = [];
        try {
            const build = async(chats: IChat[]) => {
                chats.forEach(async(chat) => {
                let buildInnerObject = {};
                let lastMsg = await Query('SELECT m.text, m.userid, m.id as messageid, u.firstname, u.lastname FROM messages m JOIN users u ON u.id = m.userid WHERE m.chatid = ? ORDER BY created DESC LIMIT 1', [chat.id]);
                buildInnerObject = {...chat, lastMSG: lastMsg}
                buildReturn.push(buildInnerObject);
               });
            }
            let bish = await build(chats);
            setTimeout(() => {resolve(buildReturn)}, 50);
        } catch (e) {
            reject(e);
        }
    });
};

const getUsersChats = async(userid: number) => {
    let chats: IChat[] = await Query('SELECT * FROM users_chats u JOIN direct_chats d ON d.id = u.chatid WHERE u.userid = ?', [userid]);
    return await buildLastMessage(chats);
}

export default {
    getUsersChats
}