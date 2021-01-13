import { RequestHandler } from "express";
import { Query } from '../../db/';

export const apiAccess: RequestHandler = (req: any, res, next) => {
    let id: number = parseInt(req.params.userid);
    if(!req.user || req.user.id !== id) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

export const userInChat: RequestHandler = async(req: any, res, next) => {
    let userid: number = parseInt(req.params.userid);
    let chatid: number = parseInt(req.params.chatid);
    try {
        const getChat = await Query('SELECT * FROM direct_chats WHERE id = ?', [chatid]);
        if(getChat[0].userid_1 !== userid && getChat[0].userid_2 !== userid) {
            res.sendStatus(401);
        } else {
            return next();
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(401);
    }
}