import React from "react";
import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { PORT } from "../../api/instance";
import DeleteIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentTC } from "../../store/slices/commentsReducer";
import { updatePostTC } from "../../store/slices/postsReducer";
import { useParams } from "react-router-dom";

export const CommentsBlock = ({ item, children }) => {
  const { comments } = useSelector(state => state.comments);
  const { posts } = useSelector(state => state.posts);
  const { items } = useSelector(state => state.user.login);
  const isLoading = comments.status === "loading";
  const dispatch = useDispatch();
  const { id } = useParams();

  const deleteComment = (commentId) => {
    if (commentId) {
      dispatch(deleteCommentTC({ commentId }));
      if (id === posts.onePost._id && item.length) {
        const payloadPost = {
          title: posts.onePost.title,
          text: posts.onePost.text,
          tags: posts.onePost.tags,
          imageUrl: posts.onePost.imageUrl,
          commentsCount: item.length - 1
        };
        dispatch(updatePostTC({ payload: payloadPost, postId: id }));
      }
    }

  };
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : item).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={`${PORT}${obj.user.avatarUrl}`} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.comments}
                  />
                  {obj.user._id === items._id &&
                    <IconButton color="secondary" onClick={() => deleteComment(obj._id)}>
                      <DeleteIcon />
                    </IconButton>}</>

              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
