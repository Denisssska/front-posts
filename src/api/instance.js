import axios from "axios";
import React from "react";
const instance = axios.create({
    baseURL: 'http://localhost:6006'
})
//создаем прослойку для определения наличия токуна при любом запросе , для авторизации
instance.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem("token")
    return config
})
export default instance;