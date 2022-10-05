import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post, TagsBlock, CommentsBlock } from "../components";

import { useAppDispatch, useAppSelector } from "../hooks/Hooks";
import { getPostsTC, getTagsTC } from "../store/slices/postsReducer";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   dispatch(getPostsTC());
  //   dispatch(getTagsTC());
  // }, []);

  const { posts, tags } = useSelector(state => state.posts);
  const isPostLoading = posts.status === "loading";
  const isTagLoading = tags.status === "loading";
   console.log(posts);
  // console.log(tags);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostLoading ?
            <Post key={index} isLoading={true} /> : (
              <Post
                key={index}
                title={obj.title}
                imageUrl={obj.imageUrl}
                id={obj._id}
                tags={obj.tags}
                viewsCount={obj.viewsCount}
                createdAt={obj.createdAt}
                user={obj.user}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg"
                },
                text: "Это тестовый комментарий"
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg"
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top"
              }
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
