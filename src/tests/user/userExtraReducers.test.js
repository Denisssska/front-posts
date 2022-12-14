import { authMeTC, loginTC, registrationTC, userReducer } from "../../store/slices/userReducer";

const initialState = {
  login: {
    items: {},
    status: "loading"
  },
  registration: {
    items: {},
    status: "registration"
  },
  authMe: {
    isAuth: false,
    status: "loading"
  }
};
describe("userSlice", () => {
  it("should change status with 'registrationTC.fulfilled' action", async () => {
    const payload = {
      email: "test@mail.ru",
      password: "12345",
      fullName: "test",
      avatarUrl: ""
    };
    const state = userReducer(initialState, registrationTC.fulfilled(payload));
    expect(state.registration.status).toBe("registered");
    expect(state.registration.items).toBe(payload);
  });
  it("should change status with 'registrationTC.rejected' action", async () => {
    const state = userReducer(initialState, registrationTC.rejected("error"));
    expect(state.registration).toEqual({
      items: {}, error: "error"
    });
  });
  it("should change status with 'loginTC.fulfilled' action", async () => {
    const payload = {
      email: "test@mail.ru",
      password: "12345"
    };
    const state = userReducer(initialState, loginTC.fulfilled(payload));
    expect(state.login.status).toBe("success");
    expect(state.login.items).toBe(payload);
  });
  it("should change status with 'loginTC.rejected' action", async () => {
    const state = userReducer(initialState, loginTC.rejected("error"));
    expect(state.login).toEqual({
      items: {}, error: "error"
    });
  });
  it("should change status with 'authMeTC.fulfilled' action", async () => {
    const payload = {
      email: "test@mail.ru",
      password:"12345",
    }
    const state = userReducer(initialState, authMeTC.fulfilled(payload));
     expect(state.login.status).toBe("success")
     expect(state.login.items).toBe(payload)
    expect(state.authMe.isAuth).toBe(true)
  });
  it("should change status with 'authMeTC.rejected' action", async () => {
    const state = userReducer(initialState, authMeTC.rejected("error"));
    expect(state.authMe.isAuth).toBe(false)
    expect(state.authMe.status).toBe("error")
  });
});


