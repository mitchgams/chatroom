import { RequestHandler } from "express";

export const isChatAuthorized: RequestHandler = (req: any, res, next) => {
    let id = req.params.userid;
    if(!req.user || req.user.id !== parseInt(id)) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}