import instance, { PORT } from "./instance";

export const UserApi = {

  registration(payload) {
    console.log(payload);
    return instance.post("/auth/register", {
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      avatarUrl: payload.avatarUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png'
    });
  },
  login(email, password) {
    return instance.post("/auth/login", { email, password });
  },
  authMe() {
    return instance.get("/auth/me");
  },
  uploadFile(formData) {
    return instance.post("/upload", formData);
  },
  updateUserFile(formData) {
    return instance.post("/update", formData);
  },
  changeUserPhotoAndName(userId, avatarUrl, fullName) {
    return instance.patch(`auth/${userId}`, {
      avatarUrl, fullName
    });
  }
};