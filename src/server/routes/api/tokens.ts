import * as express from 'express';
import * as DB from '../../db';

const router = express.Router();

router.get('/:userid?/:token?', async(req, res, next) => {
    const { userid, token } = req.params;
    try {
        let result = await DB.default.AccessTokens.findByUserid(userid, token);
        if(result.length === 0) {
            res.send({"token":"not_found"});
        } else {
            res.send({"token":"found"});
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;