import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post, TagsBlock } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { changePostsStatus, changeSortBy, getPostsTC, getTagsTC } from "../../store/slices/postsReducer";
import { PORT } from "../../api/instance";
import { getLastCommentsTC } from "../../store/slices/commentsReducer";

export const Home = () => {
  const { posts, tags } = useSelector(state => state.posts);
  // const { comments } = useSelector(state => state.comments);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.user.login);

  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getTagsTC());
  }, []);

  // useEffect(() => {
  //   dispatch(getLastCommentsTC());
  // }, [comments.isCommentDeleted]);

  useEffect(() => {
    dispatch(getPostsTC({ sorts: posts.sortByItem }));
  }, [items.fullName, items.avatarUrl, posts.sortByItem]);

  const sortNew = (sorts) => {
    if (sorts === "createdAt") {
      dispatch(changeSortBy(sorts));
      setValue(0);
    } else if (sorts === "viewsCount") {
      dispatch(changeSortBy(sorts));
      setValue(1);
    }
  };
  const isPostLoading = posts.status === "loading";
  const isTagLoading = tags.status === "loading";

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example">
        <Tab onClick={() => sortNew("createdAt")} label="Новые" />
        <Tab onClick={() => sortNew("viewsCount")} label="Популярные" />
      </Tabs>
      <Grid container spacing={2}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostLoading ?
            <Post key={index} isLoading={isPostLoading} /> : (
              <Post
                key={index}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${PORT}${obj.imageUrl}` : ""}
                id={obj._id}
                tags={obj.tags}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                createdAt={obj.createdAt}
                user={obj.user}
                isEditable={items?._id === obj.user._id}
                isViewedCount={true}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagLoading} />
          {/*{comments.lastComments.length && <CommentsBlock*/}
          {/*  item={comments.lastComments}*/}
          {/*  isLoading={false}*/}
          {/*/>}*/}
        </Grid>
      </Grid>
    </>
  );
};
