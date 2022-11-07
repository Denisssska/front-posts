import React from "react";
import styles from "./UserInfo.module.scss";
import { PORT } from "../../api/instance";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  let date = new Date(additionalText).getDate();
  let month = new Date(additionalText).getUTCMonth();
  const year = new Date(additionalText).getFullYear();
  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={`${PORT}${avatarUrl} ` || ''} alt={""} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{date + "." + month + "." + year}</span>
      </div>
    </div>
  );
};
