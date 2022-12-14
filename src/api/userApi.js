import instance from "./instance";

export const UserApi = {

  registration(payload) {
    return instance.post("/auth/register", {
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      avatarUrl: payload.avatarUrl
    });
  },
  login(email, password) {
    return instance.post("/auth/login", { email, password });
  },
  authMe() {
    return instance.get("/auth/me");
  },
    updateUserFile(formData) {
    return instance.post("/update", formData);
  },
  changeUserPhotoAndName(userId, avatarUrl, fullName) {
    return instance.patch(`/auth/${userId}`, {
      avatarUrl, fullName
    });
  }
};