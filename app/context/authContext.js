"use client"

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import API_BASE_URL from "../apiConfig"
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
        
    const [loginView, setLoginView] = useState(false);

    const [tempPost, setTempPost] = useState(null);

    const notify = (message) => toast(message)

    const login = async(inputs) =>{
        try {
            const res = await axios.post(API_BASE_URL + "/auth/login", inputs);
            setCurrentUser(res.data);
            setLoginView(false);
        } catch (err) {
            console.log(err.response.data)
            toast.error(err.response.data)
        }
    };

    const logout = async(inputs) =>{
        try {
            await axios.post(API_BASE_URL + "/auth/logout");
        } catch(err) {
            console.log(err)
        }
        setCurrentUser(null);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || null;
        setCurrentUser(storedUser)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("user", JSON.stringify(currentUser))
        }, 300)
    },[currentUser]);

    return <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, loginView, setLoginView, tempPost, setTempPost, notify }}>
                {children}
            </AuthContext.Provider>
};