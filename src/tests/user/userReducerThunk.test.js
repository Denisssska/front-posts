import { authMeTC, loginTC } from "../../store/slices/userReducer";

// global.fetch = jest.fn();

describe("loginTC", () => {
  it("should loginTC with resolved response", async () => {
    const payload = {
      email: "test@mail.ru",
      password: "12345"
    };
    // const mockLogin = {
    //   __v: 0,
    //   _id: "6371280070c56ecbeb0bb21e",
    //   avatarUrl: "/uploads/ava.jpg",
    //   createdAt: "2022-11-13T17:23:12.797Z",
    //   email: "test@mail.ru",
    //   fullName: "Test",
    //   updatedAt: "2022-11-13T17:23:12.797Z",
    //   token: ""
    // };
    // fetch.mockResolvedValue({
    //   json: () => Promise.resolve(mockLogin)
    // });

    const dispatch = jest.fn();
    const thunk = loginTC(payload);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe(loginTC.pending().type);
    expect(end[0].type).toBe(loginTC.fulfilled().type);
    expect(end[0].payload.fullName).toBe("Test");
   
  });
  it("should loginTC with rejected response", async () => {
    const payload = {
      email: "tests@mail.ru",
      password: "12345"
    };
    const dispatch = jest.fn();
    const thunk = loginTC(payload);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    console.log(calls);
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe(loginTC.pending().type);
    expect(end[0].type).toBe(loginTC.rejected().type);
    expect(end[0].payload).toBe("пользователь не найден");
  });
});


describe("authMeTC", () => {
  it("should authMeTC with resolved response",()=>{

    console.log(fetch);
  });
  it("should authMeTC with rejected response", async () => {
    const mockAuth = "Нет доступа";
    const dispatch = jest.fn();
    const thunk = authMeTC();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    console.log(calls);
    const [start, end] = calls;
    console.log(end[0]);
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe(authMeTC.pending().type);
    expect(end[0].type).toBe(authMeTC.rejected().type);
    expect(end[0].payload.data.message).toBe(mockAuth);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });

});