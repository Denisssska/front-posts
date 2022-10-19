import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { PORT } from "../../api/instance";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCommentTC } from "../../store/slices/commentsReducer";

export const AddComment = ({ img }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [commentInPost, setCommentInPost] = useState("");
  const addComment = async (event) => {
    setCommentInPost(event.currentTarget.value);
    const payload = {
      comment: commentInPost,
      postId: id
    };
    await dispatch(createCommentTC(payload));
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
            onChange={addComment}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
