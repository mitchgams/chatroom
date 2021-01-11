import * as mysql from 'mysql';
import config from '../config';

import Users from './queries/users';
import AccessTokens from './queries/tokens';

import UserChats from './queries/userchats';
import Messages from './queries/messages';
import DirectChat from './queries/directchats';

export const pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if(err) reject(err);
            return resolve(results);
        });
    });
};

export default {
    Users,
    AccessTokens,
    UserChats,
    Messages,
    DirectChat
}