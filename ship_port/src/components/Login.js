import React from 'react'
import { useState, useEffect } from "react";
import { serviceConfig } from '../settings';
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        debugger;
        e.preventDefault();
        axios({
            method: "post",
            url: `${serviceConfig.URL}/login/login`,
            data: {
                Email: email,
                Password: password,
            },
        })
        .then((response) => {
            console.log(response.data);
            var user = jwt_decode(response.data);
            const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            window.localStorage.setItem('token', response.data);
            window.location.href="/home";
        })
        .catch(() => {
            alert("Wrong credentials try again!");
            setEmail("");
            setPassword("");
            
            window.location.reload(false);
        });
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(token !== null){
            window.location.href="/home";
        }
    }, []);

    return (
        <div class="wrapper-login">
            <div class="text-center mt-4 name">
                Welcome
            </div>
            <form class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="Email" name="Email" id="Email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }}/>
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="password" name="password" id="pwd" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); }}/>
                </div>
                <button class="btn mt-3" onClick={login}>Login</button>
            </form>
        </div>
    )
}
