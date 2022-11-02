import React, { useEffect, useMemo, useState } from "react";
import { AddComment, CommentsBlock, Post } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { PostApi } from "../api/postsApi";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { PORT } from "../api/instance";
import { getAllCommentsInPostTC } from "../store/slices/commentsReducer";
import { getOnePostTC } from "../store/slices/postsReducer";


export const FullPost =() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { items } = useSelector(state => state.user.login);
  const { posts } = useSelector(state => state.posts);
  const { comments } = useSelector(state => state.comments);
  const isPostDeleted = posts.status === "Статья удалена";

  useEffect(() => {
    dispatch(getAllCommentsInPostTC({ postId: id }));
    }, [comments.process]);

  useEffect(() => {
    dispatch(getOnePostTC({ postId: id }));
  }, [items.avatarUrl, items.fullName]);


  if (isPostDeleted) {
    navigate("/");
  }
  return (
    <>
      {!posts.onePost._id ? <Post isLoading={true} /> : <Post
        title={posts.onePost.title}
        imageUrl={posts.onePost.imageUrl ? `${PORT}${posts.onePost.imageUrl}` : ""}
        tags={posts.onePost.tags}
        viewsCount={posts.onePost.viewsCount}
        commentsCount={comments.items.length}
        createdAt={posts.onePost.createdAt}
        user={posts.onePost.user}
        id={id}
        isEditable={items._id === posts.onePost.user._id}
      >
        <ReactMarkdown children={posts.onePost.text} />

      </Post>}
      {!comments.items.length ? <CommentsBlock isLoading={true} item={[]} /> :
        <CommentsBlock
          item={comments.items}
        >
          {Boolean(items.avatarUrl) && <AddComment obj={posts.onePost} img={items.avatarUrl} />}
        </CommentsBlock>}
    </>
  );
};
