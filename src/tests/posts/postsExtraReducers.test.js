import {
  createPostTC,
  deletePostTC,
  getOnePostTC,
  getPostsTC,
  postsReducer,
  updatePostTC
} from "../../store/slices/postsReducer";

const initialState = {
  posts: {
    items: [{
      _id:1,
      title: "testTitle",
      imageUrl: "",
      tags: "testTags",
      text: "testText"
    }, {
      _id:2,
      title: "testTitle2",
      imageUrl: "",
      tags: "testTags2",
      text: "testText2"
    }],
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
      title: "testTitle",
      imageUrl: "",
      tags: "testTags",
      text: "testText"
    };
    const state = postsReducer(initialState, createPostTC.fulfilled(payload));
    console.log(state);
    expect(state.posts.status).toBe("loaded");
    expect(state.posts.createdPost).toEqual(payload);
  });
  it("should change status with 'createPostTC.rejected' action", async () => {
    const state = postsReducer(initialState, createPostTC.rejected("error"));
    expect(state.posts.createdPost).toEqual({});
    expect(state.posts.error).toEqual("error");
  });
  it("should change status with 'getOnePostTC.fulfilled' action", async () => {
    const postId = "12345";
    const state = postsReducer(initialState, getOnePostTC.fulfilled(postId));
    expect(state.posts.status).toBe("loaded");
    expect(state.posts.onePost).toEqual(postId);
  });
  it("should change status with 'getOnePostTC.rejected' action", async () => {
    const state = postsReducer(initialState, getOnePostTC.rejected("error"));
    expect(state.posts.error).toEqual("error");
  });
  it("should change status with 'updatePostTC.fulfilled' action", async () => {
    const state = postsReducer(initialState, updatePostTC.fulfilled(postId));
    console.log(state);
    expect(state.posts.isUpdated).toBe(true);

  });
  it("should change status with 'authMeTC.rejected' action", async () => {
    const state = postsReducer(initialState, updatePostTC.rejected("error"));
    expect(state.posts.isUpdated).toBe(false);
    expect(state.posts.error).toBe("error");
  });
  it("should change status with 'getPostTC.fulfilled' action", async () => {
    const posts = [{
      title: "testTitle",
      imageUrl: "",
      tags: "testTags",
      text: "testText"
    }, {
      title: "testTitle2",
      imageUrl: "",
      tags: "testTags2",
      text: "testText2"
    }];
    const state = postsReducer(initialState, getPostsTC.fulfilled(posts));
    expect(state.posts.status).toBe("loaded");
    expect(state.posts.items).toEqual(posts);
  });
  it("should change status with 'getPostsTC.rejected' action", async () => {
    const state = postsReducer(initialState, getPostsTC.rejected("error"));
    expect(state.posts.error).toEqual("error");
  });
  it("should change status with 'deletePostTC.pending' action", async () => {
    const postId = 1;
    const state = postsReducer(initialState, deletePostTC.pending(postId));
    console.log(state.posts.items);
    // expect(state.posts.items).toEqual(posts);
  });
  it("should change status with 'deletePostTC.fulfilled' action", async () => {
    const postId = 1;
    const state = postsReducer(initialState, deletePostTC.fulfilled(1));
    console.log(state.posts);
    // expect(state.posts.items).toEqual(posts);
  });
  it("should change status with 'deletePostTC.rejected' action", async () => {
    const state = postsReducer(initialState, deletePostTC.rejected("error"));
    expect(state.posts.error).toEqual("error");
  });
});


