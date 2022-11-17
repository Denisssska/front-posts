import { authMeTC, loginTC } from "../../store/slices/userReducer";
import { UserApi } from "../../api/userApi";

jest.mock("../../api/userApi");

const dispatch = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatch.mockClear();
  getStateMock.mockClear();
});

describe("loginTC", () => {
  it("should loginTC with resolved response", async () => {
    const payload = {
      email: "test@mail.ru",
      password: "12345"
    };
    const mockResForFulfill = {
      __v: 0,
      _id: "6371280070c56ecbeb0bb21e",
      avatarUrl: "/uploads/ava.jpg",
      createdAt: "2022-11-13T17:23:12.797Z",
      email: "test@mail.ru",
      fullName: "Test",
      updatedAt: "2022-11-13T17:23:12.797Z"
    };

    UserApi.login.mockImplementation( () => Promise.resolve(mockResForFulfill));
    //UserApi.login.mockResolvedValue(() => Promise.resolve(mockResForFulfill));

    const thunk = loginTC(payload);
    await thunk(dispatch, getStateMock, {});
    const { calls } = dispatch.mock;
    const [start, end] = calls;
    console.log(end[0].meta);
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe(loginTC.pending().type);
    expect(end[0].type).toBe(loginTC.fulfilled().type);
    console.log(end[0]);
    //expect(end[0].payload.fullName).toBe("Test");

  });
  it("should loginTC with rejected response", async () => {
    const payload = {
      email: "tests@mail.ru",
      password: "12345"
    };
    const thunk = loginTC(payload);
    await thunk(dispatch, getStateMock, {});
    const { calls } = dispatch.mock;
    //console.log(calls);
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe(loginTC.pending().type);
    expect(end[0].type).toBe(loginTC.rejected().type);
    expect(end[0].payload).toBe("пользователь не найден");
  });
});


describe("authMeTC", () => {
  it("should authMeTC with resolved response", async () => {
    UserApi.authMe.mockReturnValue(Promise.resolve(mockResForFulfill));
    const thunk = authMeTC();
    await thunk(dispatch, getStateMock, {});
    expect(dispatch).toBeCalledTimes(2);
    const { calls } = dispatch.mock;
    const [start, end] = calls;
    console.log(start[0].meta);
    console.log(end[0].meta);
    //console.log(calls);
  });
  it("should authMeTC with rejected response", async () => {
    const mockAuth = "Нет доступа";
    const thunk = authMeTC();
    await thunk(dispatch, getStateMock, {});
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