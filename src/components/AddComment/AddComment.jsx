import React from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { PORT } from "../../api/instance";

export const AddComment = ({avatarUrl}) => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${PORT}${avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
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
