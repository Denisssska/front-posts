import React from "react";

import { Post } from "../components";
import { AddComment } from "../components";
import { CommentsBlock } from "../components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/Hooks";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const { id } = useParams();
  const { posts } = useSelector(state => state.posts);
  const isPostLoading = posts.status === "loading";
  const post = posts.items.find(item => item._id === id);

  return (
    <>
      {isPostLoading ? <Post isLoading={true} /> : <Post
        title={post.title}
        imageUrl={post.imageUrl}
        tags={post.tags}
        viewsCount={post.viewsCount}
        createdAt={post.createdAt}
        user={post.user}
        id={id}
      >
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!
        </p>
      </Post>}
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg"
            },
            text: "Это тестовый комментарий 555555"
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
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
