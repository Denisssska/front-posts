import React, { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserApi } from "../../api/userApi";
import { PostApi } from "../../api/postsApi";


export const AddPost = () => {
  const { isAuth } = useSelector((state) => state.user.authMe);
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await UserApi.uploadFile(formData);
      setImageUrl(data.url);
    } catch (e) {
      console.warn(e);
      alert("Ошибка при загрузке файла");
    }
  };
  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        imageUrl,
        tags:tags.split(','),
        text
      };
      const { data } = await PostApi.createPost(fields);
      const id = data._id;
      navigate(`/posts/${id}`);
    } catch (e) {
      console.warn(e);
      alert("Ошибка при создании статьи");
    }
  };
  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

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
  if (!isAuth) {
    navigate("/");
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <><Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
          <img
            className={styles.image}
            src={`http://localhost:6006${imageUrl}`}
            alt="Uploaded"
          /></>
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
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <NavLink to="/">
          <Button size="large">Отмена</Button>
        </NavLink>
      </div>
    </Paper>
  );
};
