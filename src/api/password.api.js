import instance from "./instance";


export const ChangePassword = {
  forgotPass(email) {
    console.log(email);
    return instance.post('/auth/send-password-link', {
    email,
      message: `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                        <a href='https://localhost:3000/create-password'>link</a>
                      </div>`
    });
  },
  createPass(password, token) {
    return instance.post('/auth/create-new-password',
      {password, resetPasswordToken: token});
  }
};