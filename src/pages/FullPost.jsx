import React, { useEffect, useState } from "react";

import { AddComment, CommentsBlock, Post } from "../components";
import { useParams } from "react-router-dom";
import { PostApi } from "../api/postsApi";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const [obj, setObj] = useState({});
  const [postLoading, setPostLoading] = useState(true);
  const { id } = useParams();
  const {items} = useSelector(state=>state.user.login)
  console.log(obj);
  useEffect(() => {
    PostApi.getOnePost(id).then(
      res => {
        setObj(res.data);
        setPostLoading(false);
      }
    ).catch((err) => {
      console.warn(err);
      alert("Ошибка при получении статьи");
    });
  }, [id]);
  //
  // const { posts } = useSelector(state => state.posts);
  // const isPostLoading = posts.status === "loading";
  // const post = posts.items.find(item => item._id === id);

  return (
    <>
      {postLoading ? <Post isLoading={postLoading} /> : <Post
        title={obj.title}
        imageUrl={obj.imageUrl}
        tags={obj.tags}
        viewsCount={obj.viewsCount}
        createdAt={obj.createdAt}
        //user={obj.user}
        id={id}
        isEditable={items._id === obj.user}
      >
        <p>
          Hey there! 👋 I'm Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dolore impedit, incidunt itaque magni repellat veniam. Aspernatur at, deserunt
          dignissimos distinctio earum, fuga inventore iste labore minus nobis perspiciatis porro possimus?
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
