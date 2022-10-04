import axios from "axios";
import React from "react";
export const instance = axios.create({
    baseURL: 'http://localhost:6006'
})