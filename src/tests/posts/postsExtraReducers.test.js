import { createPostTC, postsReducer } from "../../store/slices/postsReducer";


const initialState = {
  posts: {
    items: [],
    onePost: {},
    createdPost: {},
    status: "loading",
    isUpdated: false,
    sortByItem: "createdAt"
  },
  tags: {
    items: [],
    status: "loading"
  },
  comments: {
    items: [],
    status: "loading"
  }
};
describe("postsSlice", () => {
  it("should change status with 'createPostTC.fulfilled' action", async () => {
    const payload = {
      title:"testTitle",
      imageUrl:"",
      tags: "testTags",
      text:"testText"
    };
    const state = postsReducer(initialState, createPostTC.fulfilled(payload));
    console.log(state);
    expect(state.posts.status).toBe("loaded");
    expect(state.posts.createdPost).toEqual(payload);
  });
  it("should change status with 'registrationTC.rejected' action", async () => {
    const state = postsReducer(initialState, createPostTC.rejected("error"));
    console.log(state);
    expect(state.posts.createdPost).toEqual({});
    expect(state.posts.error).toEqual("error");
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


