import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';


const Button = (props: AppProps) => {

    const {isTo, link, text} = props.pack;

    if(isTo) {
        return (
            <button className="btn btn-secondary m-1"></button>
        );
    } else {
        <button className="btn btn-secondary m-1"></button>
    }
}

interface AppProps {
    pack: IButtonPack;
}

interface IButtonPack {
    isTo: boolean;
    link: string;
    text: string;
}

export default Button;
