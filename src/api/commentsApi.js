import instance from "./instance";

export const CommentApi = {
  createComment(payload) {
    return instance.post("/comments", {
      comments: payload.comment, postId: payload.postId
    });
  },
  getAllCommentsInPost(postId) {
    return instance.get(`/comments/${postId}`);
  },
  getLastComments() {
    return instance.get("/comments",{params:{item:'3'}});
  },
  getAllComments() {
    return instance.get(`/comments`);
  },
  deleteComment(commentId) {
    console.log(commentId);
    return instance.delete(`/comments/${commentId}`);
  },

  updateComment(commentId, payload) {
    return instance.patch(`/comments/${commentId}`, {
      comment: payload.comment, postId: payload.postId
    });
  }
};
