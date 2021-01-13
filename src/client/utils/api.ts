import * as fetch from 'isomorphic-fetch';


export let AccessToken: string = localStorage.getItem('token') || null;

export let User: any = {
    userid: localStorage.getItem('userid') || null,
    role: localStorage.getItem('role') || null,
};

export const json = async <T = any>(url: string, method: string = 'GET', body?: {}) => {
    let headers: any = {
        'Content-type': 'application/json'
    };
    if(AccessToken) {
        headers['Authorization'] = `Bearer ${AccessToken}`;
    }
    try {
        let results = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if(results.ok) {
            return <T>(await results.json())
        } else {
            return false;
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
}

export const SetAccessToken = (token: string, user: {} = { userid: undefined, role: 'quest', email: undefined, firstname: undefined, lastname: undefined}) => {
    AccessToken = token;
    User = user;

    localStorage.setItem('token', token);
    localStorage.setItem('userid', User.userid);
    localStorage.setItem('role', User.role);
    localStorage.setItem('email', User.email);
    localStorage.setItem('firstname', User.firstname);
    localStorage.setItem('lastname', User.lastname);
}

export const isTokenValid = async() => {
    let search = await json(`/api/tokens/${User.userid}/${AccessToken}`);
    if(search.token === 'not_found') {
        return false;
    } else {
        return true
    }

}