import * as express from 'express';
import DB from '../../db';

import { HashPassword } from '../../utils/security/passwords';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

interface IUser {
    email: string,
    password: string,
    firstname: string,
    lastname: string;
}

router.post('/', async(req, res, next) => {
    try {
        let user: IUser = req.body;
        user.password = HashPassword(req.body.password);
        let result: any = await DB.Users.insert(user);
        console.log(result.insertId)
        let token = await CreateToken({ userid: result.insertId });
        res.json({
            token,
            role: 'quest',
            userid: result.insertId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        });
    } catch (e) {
        if(e.code === 'ER_DUP_ENTRY') {
            res.send({"status":"duplicate_email"});
        }
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;