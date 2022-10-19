import React, { useEffect, useState } from "react";
import { AddComment, CommentsBlock, Post } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { PostApi } from "../api/postsApi";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { PORT } from "../api/instance";
import { getAllCommentsInPostTC } from "../store/slices/commentsReducer";


export const FullPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [postLoading, setPostLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const { id } = useParams();
  const { items } = useSelector(state => state.user.login);

  const { posts } = useSelector(state => state.posts);
  const { comments } = useSelector(state => state.comments);

  const isPostDeleted = posts.status === "Статья удалена";
  useEffect(() => {
    dispatch(getAllCommentsInPostTC(id));
    setCommentsLoading(false);
  }, []);

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
  if (isPostDeleted) {
    navigate("/");
  }
  return (
    <>
      {postLoading ? <Post isLoading={postLoading} /> : <Post
        title={obj.title}
        imageUrl={obj.imageUrl ? `${PORT}${obj.imageUrl}` : ""}
        tags={obj.tags}
        viewsCount={obj.viewsCount}
        createdAt={obj.createdAt}
        user={obj.user}
        id={id}
        isEditable={items._id === obj.user._id}
      >
        <ReactMarkdown children={obj.text} />

      </Post>}
      {commentsLoading ? <CommentsBlock isLoading={commentsLoading} items={[]} /> :
        <CommentsBlock
          items={comments.items}
        >
          {Boolean(items.avatarUrl) && <AddComment img={items.avatarUrl} />}
          {/*<AddComment img={items.avatarUrl} />*/}
        </CommentsBlock>}
    </>
  );
};
