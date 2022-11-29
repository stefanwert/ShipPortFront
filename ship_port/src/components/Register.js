import React from 'react'
import { useState } from "react";
import { serviceConfig } from '../settings';
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [surename, setSurename] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const register = (e) => {
        e.preventDefault();
        if(password !== password2){
            alert("Passwords don't match !!!");
            return;
        }
        axios({
            method: "post",
            url: `${serviceConfig.URL}/user/register`,
            data: {
                Email: email,
                Password: password,
                Name: name,
                Surename: surename,
                Role: isAdmin? "Admin": "Menager"
            },
        })
        .then(() => {
            window.location.href = "/login";
        })
        .catch(() => {
            alert("Registration faild !");
            setEmail("");
            setPassword("");
            setPassword2("");
            setName("");
            setSurename("");
            window.location.reload(false);
        });
    };

    return (
        <div class="wrapper-login">
            <div class="text-center mt-4 name">
                Register
            </div>
            <form class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input checked={isAdmin} type="email" name="Email" id="Email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }}/>
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="text" name="name" id="name" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value); }}/>
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="text" name="surename" id="surename" placeholder="Surename" value={surename} onChange={(e) => { setSurename(e.target.value); }}/>
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="password" name="password" id="pwd" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); }}/>
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="password" name="password2" id="pwd2" placeholder="Confirm password" value={password2} onChange={(e) => { setPassword2(e.target.value); }}/>
                </div>
                <div class="form-check form-switch">
                    <input onChange={(e)=>setIsAdmin(!isAdmin)} value={isAdmin} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                    <label class="form-check-label" for="flexSwitchCheckDefault">Are you admin</label>
                </div>
                <button class="btn mt-3" onClick={register}>Register</button>
            </form>
        </div>
    )
}
