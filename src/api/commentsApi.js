import instance from "./instance";

export const CommentApi = {
  createComment(payload) {
    return instance.post("/comments", {
      comment: payload.comment,
   postId:payload.postId
    });
  },
  getPosts() {
    return instance.get("/posts");
  },
  getOnePost(postId) {
    return instance.get(`/posts/${postId}`);
  },
  deletePost(postId) {
    return instance.delete(`/posts/${postId}`);
  },
  updatePost(postId, payload) {
    return instance.patch(`/posts/${postId}`, {
      title: payload.title,
      text: payload.text,
      tags: payload.tags,
      imageUrl: payload.imageUrl
    });
  },
  getPopularPosts(limit){
    return instance(`/posts/popular/${limit}`)
  },
  getTags() {
    return instance.get("/tags");
  }
};
