import * as express from 'express';
import * as passport from 'passport';


import usersRouter from './users';
import chatsRouter from './chats';
import tokenRouter from './tokens';

const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});


router.use('/users', usersRouter);
router.use('/chats', chatsRouter);
router.use('/tokens', tokenRouter);


export default router;