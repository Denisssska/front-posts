import React, { useEffect } from "react";
import { CommentsBlock } from "./CommentsBlock";
import { AddComment } from "../AddComment/AddComment";
import { getAllCommentsInPostTC } from "../../store/slices/commentsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initComments } from "../../selectors/commentsSelector";
import { initUser } from "../../selectors/userSelector";
import { initPost } from "../../selectors/postsSelector";

export const CommentsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comments } = useSelector(initComments.all);
  const { items } = useSelector(initUser.login);
  const {onePost} = useSelector(initPost.posts);
  useEffect(() => {
    dispatch(getAllCommentsInPostTC({ postId: id }));
  }, [comments.isCommentChanged, items.avatarUrl, items.fullName]);

  return (
    <>
      <CommentsBlock
        item={comments.items}
      >
        {items._id && <AddComment obj={onePost} img={items.avatarUrl} />}
      </CommentsBlock>
    </>
  );
};

