export const initPost = {
  posts(state) {
    return state.posts.posts;
  },
  tags(state) {
    return state.posts.tags;
  },
  comments(state) {
    return state.posts.comments;
  }
};