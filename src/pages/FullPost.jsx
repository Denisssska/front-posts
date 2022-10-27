import React, { useEffect, useState } from "react";
import { AddComment, CommentsBlock, Post } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { PostApi } from "../api/postsApi";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { PORT } from "../api/instance";
import { getAllCommentsInPostTC } from "../store/slices/commentsReducer";
import { getOnePostTC } from "../store/slices/postsReducer";


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
  //console.log(obj);
  useEffect(() => {
    dispatch(getAllCommentsInPostTC(id));
    setCommentsLoading(false);
  }, [comments.process]);

  useEffect(() => {
    // dispatch(getOnePostTC({ postId: id }));
    PostApi.getOnePost(id).then(
      res => {
        setObj(res.data);
        setPostLoading(false);
      }
    ).catch((err) => {
      console.warn(err);
      alert("Ошибка при получении статьи");
    });
  }, [ items.avatarUrl, items.fullName]);
 // console.log(posts.onePost);

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
        commentsCount={comments.items.length}
        createdAt={obj.createdAt}
        user={obj.user}
        id={id}
        isEditable={items._id === obj.user._id}
      >
        <ReactMarkdown children={obj.text} />

      </Post>}
      {commentsLoading ? <CommentsBlock isLoading={commentsLoading} item={[]} /> :
        <CommentsBlock
          item={comments.items}
        >
          {Boolean(items.avatarUrl) && <AddComment obj={obj} img={items.avatarUrl} />}
        </CommentsBlock>}
    </>
  );
};
