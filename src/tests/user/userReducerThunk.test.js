import { authMeTC, fetchTodos, loginTC } from "../../store/slices/userReducer";
import { UserApi } from "../../api/userApi";
import {instance} from "../../api/instance";
import axios from "axios";

jest.mock("../../api/userApi");
jest.mock("../../api/instance");
jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    }))
  }
})

const dispatch = jest.fn();
const getStateMock = jest.fn();
global.fetch = jest.fn();

beforeEach(() => {
  dispatch.mockClear();
  getStateMock.mockClear();
});
const mockResForFulfilled = {
  __v: 0,
  _id: "6371280070c56ecbeb0bb21e",
  avatarUrl: "/uploads/ava.jpg",
  createdAt: "2022-11-13T17:23:12.797Z",
  email: "test@mail.ru",
  fullName: "Test",
  updatedAt: "2022-11-13T17:23:12.797Z"
};

describe("loginTC", () => {
  it("should loginTC with resolved response", async () => {
    const payload = {
      email: "test@mail.ru",
      password: "12345"
    };
     // UserApi.login.mockImplementation(() => Promise.resolve(mockResForFulfilled));
    fetch.mockResolvedValue({
      json: () => Promise.resolve(mockResForFulfilled)
    });
    const thunk = loginTC({});
    await thunk(dispatch, () => ({}), {});
    const { calls } = dispatch.mock;
    console.log(calls);
    const [start, end] = calls;
    //console.log(end[0].meta);
    expect(calls).toHaveLength(2);
    // expect(start[0].type).toBe(loginTC.pending.type);
    // expect(end[0].type).toBe(loginTC.fulfilled.type);
    console.log(end[0].payload);
    //expect(end[0].payload.fullName).toBe("Test");
    // console.log(UserApi.login);
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
    //console.log(start[0].meta);
    //console.log(end[0].meta);
    //console.log(calls);
  });
  it("should authMeTC with rejected response", async () => {
    const mockAuth = "Нет доступа";
    const thunk = authMeTC();
    await thunk(dispatch, getStateMock, {});
    const { calls } = dispatch.mock;
    //console.log(calls);
    const [start, end] = calls;
    //console.log(end[0]);
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe(authMeTC.pending().type);
    expect(end[0].type).toBe(authMeTC.rejected().type);
    expect(end[0].payload.data.message).toBe(mockAuth);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });

});
describe("todo", () => {
  it("should show", async () => {
    const mockTodo = [{
      id: 1,
      title: "test",
      completed: false,
      userId: 1
    }];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodo)
    });

    const dispatch = jest.fn();
    const thunk = fetchTodos();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    const [start, end] = calls;
    console.log(end[0].payload);
    expect(calls).toHaveLength(2);
  });
});