export interface IActiveChats {
    id: number,
    title: string,
    userid_1: number,
    userid_2: number,
    created: string,
    chatid: number,
    lastMSG: IChatLastMessage[];
}

export interface IChatLastMessage {
    chatid: number,
    id: number,
    userid: number,
    firstname: string,
    lastname: string,
    text: string,
    created: string;
}
export interface IUsers {
    [key: number]: IEachUsers;
}
export interface IEachUsers {
    userid1: number,
    userid2: number,
    firstname1: string,
    firstname2: string,
    lastname1: string,
    lastname2: string;
}