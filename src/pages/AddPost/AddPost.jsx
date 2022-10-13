import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserApi } from "../../api/userApi";
import { PostApi } from "../../api/postsApi";
import { PORT } from "../../api/instance";

export const AddPost = () => {
  const { isAuth } = useSelector((state) => state.user.authMe);
  const navigate = useNavigate();
  const { id } = useParams();
  const postIdEdit = id;
  const isEditing = Boolean(id);
  useEffect(() => {
    if (id) {
      PostApi.getOnePost(id).then(
        res => {
          //console.log(res.data);
          setTitle(res.data.title);
          setText(res.data.text);
          setTags(res.data.tags.join(","));
          setImageUrl(res.data.imageUrl);
        }
      ).catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
    }
  }, []);
  const inputFileRef = useRef(null);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
      const fields = {
        title,
        imageUrl,
        tags: tags.split(","),
        text
      };
      const { data } = isEditing ? await PostApi.updatePost(postIdEdit, fields) : await PostApi.createPost(fields);
      const id = isEditing ? postIdEdit : data._id;
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
            src={`${PORT}${imageUrl}`}
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
          {isEditing ? "Опубликовать" : "Сохранить"}
        </Button>
        <NavLink to="/">
          <Button size="large">Отмена</Button>
        </NavLink>
      </div>
    </Paper>
  );
};
