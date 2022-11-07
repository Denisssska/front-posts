import instance from "./instance";


export const ChangePassword = {
  forgotPass(email) {
    console.log(email);
    return instance.post("/auth/send-password-link", {
      email,
      message: `<div style="background-color: lime; padding: 15px">
                        password recovery link:
                        <a href="https://front-posts-jgbiyl7cj-denisssska.vercel.app/create-password/$id$/$token$">link</a>
                      </div>`
    });
  },
  createPass(password, token, id) {
    return instance.get(`/auth/create-new-password/${id}/${token}`, { params: { password } });
  }
};