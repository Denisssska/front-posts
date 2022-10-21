import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { PORT } from "../../api/instance";
import { useParams } from "react-router-dom";
import { CommentApi } from "../../api/commentsApi";

export const AddComment = ({ img }) => {
  const { id } = useParams();
  const [commentInPost, setCommentInPost] = useState("");
  const writeComment = (event) => {
    setCommentInPost(event.currentTarget.value);
  };
  const createComment = async () => {
    try {
      const payload = {
        comment: commentInPost,
        postId: id
      };
      const { data } = await CommentApi.createComment(payload);
      console.log(data);
    } catch (e) {
      console.log(e);
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
          />
          <Button onClick={createComment} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
