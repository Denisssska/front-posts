import React, { useEffect } from "react";
import { Post } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { PORT } from "../../api/instance";
import { getOnePostTC } from "../../store/slices/postsReducer";
import { CommentsContainer } from "../../components/commentsContainer/CommentsContainer";


export const FullPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { items } = useSelector(state => state.user.login);
  const { posts } = useSelector(state => state.posts);

  const isPostDeleted = posts.status === "Статья удалена";


  useEffect(() => {
    dispatch(getOnePostTC({ postId: id }));
  }, [items.avatarUrl, items.fullName]);


  if (isPostDeleted) {
    navigate("/");
  }
  return (
    <>
      {!posts.onePost._id ? <Post isLoading={true} /> : <Post
        title={posts.onePost.title}
        imageUrl={posts.onePost.imageUrl ? `${PORT}${posts.onePost.imageUrl}` : ""}
        tags={posts.onePost.tags}
        createdAt={posts.onePost.createdAt}
        user={posts.onePost.user}
        id={id}
        isViewedCount={false}
        isEditable={items._id === posts.onePost.user._id}
      >
        <ReactMarkdown children={posts.onePost.text} />

      </Post>}
      <CommentsContainer />
    </>
  );
};
