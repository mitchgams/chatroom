import * as express from 'express';
import * as DB from '../../db';
import { isAdmin } from '../../utils/security/isAdmin';
import { isChatAuthorized } from '../../utils/security/chatAuthorized';

const router = express.Router();

router.get('/:userid?', isChatAuthorized, async(req, res, next) => {
    try {
        let users = await DB.default.Users.getAlls();
        res.send(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/chat_users/:chatid?/:userid?', isChatAuthorized, async(req, res, next) => {
    const { chatid } = req.params;
    try {
        let users = await DB.default.DirectChat.getChatUsers(parseInt(chatid));
        res.send(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/by_id/:recipientId?/:userid?', isChatAuthorized, async(req, res, next) => {
    const { userid, recipientId } = req.params;
    if(userid && recipientId) {
        try {
            let user = await DB.default.Users.findRecipientById(parseInt(recipientId));
            res.send(user);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        console.log('Can\'t get user via /api/users/by_id/? because id wasn\'t provided.');
        res.sendStatus(500);
    }
});

export default router;