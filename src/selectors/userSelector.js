export const initUser = {
  auth(state) {
    return state.user.authMe;
  },
  registration(state) {
    return state.user.registration;
  },
  login(state) {
    return state.user.login;
  }
};