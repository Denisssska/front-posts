import React from "react";
import instance from "./instance";

export const PostApi = {
  createPost(payload) {
    return instance.post("/posts", {
      title: payload.title,
      text: payload.text,
      tags: payload.tags,
      imageUrl: payload.imageUrl
    });
  },
  getPosts(sorts) {
    return instance.get("/posts", { params: { sorts } });
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
      imageUrl: payload.imageUrl,
      commentsCount: payload.commentsCount
    });
  },
  getPopularPosts(limit) {
    return instance(`/posts/popular/${limit}`);
  },
  getTags() {
    return instance.get("/tags");
  }
};
