import * as express from 'express';
import * as DB from '../../db';
import { apiAccess, userInChat } from '../../utils/security/chatAuthorized';

const router = express.Router();

router.get('/user_chats/:userid?', apiAccess, async(req, res, next) => {
    const { userid } = req.params;
    try {
        let userChats = await DB.default.UserChats.getUsersChats(parseInt(userid));
        res.send(userChats);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/messages_of_chat/:userid?/:userid?', apiAccess, userInChat, async(req, res, next) => {
    const {userid} = req.params;
    try {
        let messages = await DB.default.Messages.getMessagesForChat(parseInt(userid));
        res.send(messages);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/check_chat_exists/:id1?/:id2?/:userid?', apiAccess, async(req, res, next) => {
    const { id1, id2 } = req.params;
    try {
        let chatExists = await DB.default.DirectChat.checkIfChatExistsBetweenUsers(parseInt(id1), parseInt(id2));
        chatExists ? res.send({"chat_exists": true}) :  res.send({"chat_exists": false});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/get_chat/:chatid?/:userid?', apiAccess, userInChat, async(req, res, next) => {
    const { chatid } = req.params;
    try {
        let chat = await DB.default.DirectChat.getDirectChat(parseInt(chatid));
        res.send(chat);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/get_messages/:chatid?/:userid?', apiAccess, userInChat, async(req, res, next) => {
    const { chatid } = req.params;
    try {
        let messages = await DB.default.Messages.getMessagesForChat(parseInt(chatid));
        res.send(messages);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}); 

router.get('/last_message/:chatid?/:userid?', apiAccess, userInChat, async(req, res, next) => {
    const { chatid } = req.params;
    try {
        let lastMSG = await DB.default.Messages.getLastMessage(parseInt(chatid));
        res.send(lastMSG);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/create_chat/:userid?', apiAccess, async(req, res, next) => {
    const { userid, recipientid, title } = req.body;
    try {
        let create = await DB.default.DirectChat.createDirectChat(userid, recipientid, title);
        res.send({"status":"complete"});
    } catch (e) {
        console.log(e);
        res.status(500).send({"status":"fail"});
    }
});

router.post('/send_message/:userid?', apiAccess, async(req, res, next) => {
    const { userid, message, chatid } = req.body;
    try {
        let sendMsg = await DB.default.Messages.postMessage(parseInt(userid), parseInt(chatid), message);
        res.send({"status":"complete"});
    } catch (e) {
        console.log(e);
        res.status(500).send({"status":"fail"});
    }
});

export default router;