import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PORT } from "../../api/instance";
import { changePostsStatus, createPostTC, getOnePostTC, updatePostTC } from "../../store/slices/postsReducer";
import { savePhotoOnServer } from "../../utils/savePhotoOnServer";
import { Snackbar } from "@mui/material";
import { initPost } from "../../selectors/postsSelector";
import { initUser } from "../../selectors/userSelector";

export const AddPost = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(initUser.auth);
  const posts = useSelector(initPost.posts);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOnePostTC({ postId: id })).then(res => {
        setTitle(res.payload.title);
        setText(res.payload.text);
        setTags(res.payload.tags.join(","));
        setImageUrl(res.payload.imageUrl);
      });
    }
  }, [posts.createdPost]);

  const inputFileRef = useRef(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeFile = async (event) => {
    const data = await savePhotoOnServer(event);
    setImageUrl(data);
  };

  const onSubmit = () => {
    const fields = {
      title,
      imageUrl,
      tags: tags.split(","),
      text
    };
    dispatch(id ? updatePostTC({ postId: id, payload: fields }) : createPostTC({ payload: fields }));
    if (id) {
      navigate(`/posts/${id}`);
    }
  };
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000
      }
    }),
    []
  );
  if (!isAuth || posts.status === "loaded") {
    navigate("/");
  }
  console.log(posts.status);
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">Загрузить превью</Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={() => setImageUrl("")}>Удалить</Button>
          <img className={styles.image} src={`${PORT}${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <TextField
        onChange={(e) => setTags(e.currentTarget.value)}
        value={tags}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={e => setText(e)}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">{id ? "Опубликовать" : "Сохранить"}</Button>
        <NavLink to="/">
          <Button size="large">Отмена</Button>
        </NavLink>
      </div>
      {posts.status !== "loading" && posts.status !== "loaded" &&
        posts.status.map((item, id) => <Snackbar key={id} open
                                                 anchorOrigin={{
                                                   vertical: "bottom",
                                                   horizontal: "center"
                                                 }}
                                                 message={item.msg} />)
      }
    </Paper>
  );
};
