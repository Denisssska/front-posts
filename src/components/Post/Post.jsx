import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo/UserInfo";
import { PostSkeleton } from "./Skeleton";
import { NavLink } from "react-router-dom";
import { deletePostTC } from "../../store/slices/postsReducer";
import { useDispatch } from "react-redux";

export const Post = ({
                       imageUrl,
                       title,
                       id,
                       children,
                       isFullPost,
                       isLoading, tags, viewsCount, createdAt,
                       user, isEditable, commentsCount
                     }) => {
  const dispatch = useDispatch();
  if (commentsCount) {
    commentsCount = commentsCount.filter(item => item === id);
  }

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить пост?")) {
      dispatch(deletePostTC(id));
    }
  };

  if (isLoading) {
    return <PostSkeleton />;
  }
  return (
    <div
      className={clsx(styles.root, { [styles.rootFull]: isFullPost })}
    >

      {isEditable && <div className={styles.editButtons}>
        <NavLink to={`/posts/${id}/edit`}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </NavLink>
        <IconButton onClick={onClickRemove} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>}

      {imageUrl ? <img
        //style={{margin:"0 auto",marginTop:'2%',display: 'block'}}
        className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        src={imageUrl || "https://logos.flamingtext.com/Word-Logos/post-design-sketch-name.png"} alt={title}
      /> : <></>}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <NavLink to={`/posts/${id}`}>{title}</NavLink>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name, index) => (
              <li key={index}>
                <NavLink to={`/tag/${name}`}>#{name}</NavLink>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount.length || "0"}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
