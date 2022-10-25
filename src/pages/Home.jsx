import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { CommentsBlock, Post, TagsBlock } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getPostsTC, getTagsTC } from "../store/slices/postsReducer";
import { PORT } from "../api/instance";

export const Home = () => {
  const { posts, tags } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.user.login);
const [value,setValue]=useState(0)
  useEffect(() => {
    dispatch(getTagsTC());
  }, []);

  useEffect(() => {
    dispatch(getPostsTC('createdAt'));
  }, [items.fullName, items.avatarUrl]);

const sortNew =()=>{
  dispatch(getPostsTC('createdAt'));
  setValue(0)
}
const sortPop =()=>{
  dispatch(getPostsTC('viewsCount'));
  setValue(1)
}
  const isPostLoading = posts.status === "loading";
  const isTagLoading = tags.status === "loading";

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example">
        <Tab onClick={sortNew} label="Новые" />
        <Tab onClick={sortPop} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
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
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagLoading} />
          <CommentsBlock
            item={[]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
