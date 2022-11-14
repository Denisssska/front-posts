import { registrationTC, userReducer } from "../../store/slices/userReducer";

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
      password:"12345",
      fullName:"test",
      avatarUrl:""
    }
    const state = userReducer(initialState,registrationTC.fulfilled(payload))
    expect(state.registration.status).toBe("registered")
    expect(state.registration.items).toBe(payload)
  });
  it("should change status with 'registrationTC.rejected' action", async () => {
    const state = userReducer(initialState,registrationTC.rejected("error"))
        expect(state.registration).toEqual({
      items:{},error:"error"
    })
  });
});

