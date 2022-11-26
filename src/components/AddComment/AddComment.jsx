import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import Avatar from "@mui/material/Avatar";
import { PORT } from "../../api/instance";
import { useParams } from "react-router-dom";
import { updatePostTC } from "../../store/slices/postsReducer";
import { useDispatch, useSelector } from "react-redux";
import { createCommentTC } from "../../store/slices/commentsReducer";
import { initComments } from "../../selectors/commentsSelector";
import { ColorButton } from "../Header/buttonStyle";
import { CssTextField } from "../../pages/textFieldStyle";

export const AddComment = ({ img, obj }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [commentInPost, setCommentInPost] = useState("");
  const comments = useSelector(initComments.all);

  const writeComment = (event) => {
    setCommentInPost(event.currentTarget.value);
  };
  const createComment = () => {
    dispatch(createCommentTC({
      comment: commentInPost,
      postId: id
    }));
    if (comments.items) {
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
          <CssTextField
            className={styles.field}
            onChange={(event) => writeComment(event)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={commentInPost}
          />
          <ColorButton disabled={commentInPost === ""} onClick={createComment}
                       variant="outlined">Отправить</ColorButton>
        </div>
      </div>
    </>
  );
};
