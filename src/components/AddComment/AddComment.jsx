import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { PORT } from "../../api/instance";
import { useParams } from "react-router-dom";
import { updatePostTC } from "../../store/slices/postsReducer";
import { useDispatch, useSelector } from "react-redux";
import { createCommentTC } from "../../store/slices/commentsReducer";

export const AddComment = ({ img, obj }) => {
  const { items } = useSelector(state => state.user.login);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [commentInPost, setCommentInPost] = useState("");

  const { comments } = useSelector(state => state.comments);

  const writeComment = (event) => {
    setCommentInPost(event.currentTarget.value);
  };
  const createComment = () => {
    dispatch(createCommentTC({
      comment: commentInPost,
      postId: id,
    }));
    if (comments.items.length) {
      const payloadPost = {
        title: obj.title,
        text: obj.text,
        tags: obj.tags,
        imageUrl: obj.imageUrl,
        commentsCount: comments.items.length + 1
      };
      dispatch(updatePostTC({ postId: id, payload: payloadPost }));
      setCommentInPost("");

    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${PORT}${img}`}
        />
        <div className={styles.form}>
          <TextField
            onChange={(event) => writeComment(event)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={commentInPost}
          />
          <Button disabled={commentInPost === ""} onClick={createComment} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
