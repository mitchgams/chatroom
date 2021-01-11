import { Query } from '../index';

const getAlls = async() => Query('SELECT email, firstname, lastname, id FROM users');

const findOneByEmail = async (email: string) => Query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);

const findOneById = async (id: number) => Query('SELECT * FROM users where id = ? LIMIT 1', [id]);

const findRecipientById = async (id: number) => Query('SELECT email, firstname, lastname, id FROM users WHERE id = ? LIMIT 1', [id]);

interface IUser {
    email: string,
    password: string,
    firstname: string,
    lastname: string;
}

const insert = async (user: IUser) => {
    return Query('INSERT INTO users (email, firstname, lastname, password) VALUES (?, ?, ?, ?)', [user.email, user.firstname, user.lastname, user.password]);
}

const getAuthors = async() => Query('SELECT id, firstname, lastname, email FROM users WHERE role != "guest"');


export default {
    getAlls,
    findOneByEmail,
    findOneById,
    findRecipientById,
    insert,
    getAuthors
}