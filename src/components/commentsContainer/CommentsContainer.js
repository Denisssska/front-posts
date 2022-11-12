import React, { useEffect } from "react";
import { CommentsBlock } from "./CommentsBlock";
import { AddComment } from "../AddComment/AddComment";
import { getAllCommentsInPostTC } from "../../store/slices/commentsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const CommentsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comments);
  const { items } = useSelector(state => state.user.login);
  const { posts } = useSelector(state => state.posts);
  useEffect(() => {
    dispatch(getAllCommentsInPostTC({ postId: id }));
  }, [comments.isCommentChanged, items.avatarUrl, items.fullName]);

  return (
    <>
      <CommentsBlock
        item={comments.items}
      >
        {items._id && <AddComment obj={posts.onePost} img={items.avatarUrl} />}
      </CommentsBlock>
    </>
  );
};

