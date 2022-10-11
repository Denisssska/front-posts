import instance from "./instance";
import React from "react";
// type UserPayloadType = {
//     email: string
//     password: string
//     fullName: string
//     avatarUrl: string
//
// }
export const UserApi = {

  registration(payload) {
    return instance.post("/auth/register", {
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      avatarUrl: payload.avatarUrl || ""
    });
  },
  login(email, password) {
    return instance.post("/auth/login", { email, password });
  },
  authMe() {
    return instance.get("/auth/me");
  },
  uploadFile(formData){
    return instance.post('/upload',formData)
  }
};