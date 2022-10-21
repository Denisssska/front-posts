import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { CommentsBlock, Post, TagsBlock } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getPostsTC, getTagsTC } from "../store/slices/postsReducer";
import { PORT } from "../api/instance";
import { getAllCommentsInPostTC, getAllCommentsTC } from "../store/slices/commentsReducer";

export const Home = () => {
  const { posts, tags, comments } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.user.login);
  let mass = [];
  if (comments.items.length) {
    mass = comments.items.map(item => item.postId);
  }
  console.log(mass);
  //console.log(comments.items);
  //console.log(posts.items);
  useEffect(() => {
    dispatch(getTagsTC());
  }, []);

  useEffect(() => {
    dispatch(getPostsTC());
  }, [items.fullName, items.avatarUrl]);

  useEffect(() => {
    dispatch(getAllCommentsTC());
  }, []);

  const isPostLoading = posts.status === "loading";
  const isTagLoading = tags.status === "loading";

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
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
                commentsCount={mass ? mass : []}
                createdAt={obj.createdAt}
                user={obj.user}
                isEditable={items?._id === obj.user._id}
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
