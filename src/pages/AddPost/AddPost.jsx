import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserApi } from "../../api/userApi";
import { PORT } from "../../api/instance";
import { createPostTC, getOnePostTC, updatePostTC } from "../../store/slices/postsReducer";

export const AddPost = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user.authMe);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOnePostTC(id)).then(res => {
        setTitle(res.payload.title);
        setText(res.payload.text);
        setTags(res.payload.tags.join(","));
        setImageUrl(res.payload.imageUrl);
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
  // const onSubmit = async () => {
  //   try {
  //     const fields = {
  //       title,
  //       imageUrl,
  //       tags: tags.split(","),
  //       text
  //     };
  //     const { data } = id ?
  //       await PostApi.updatePost(id, fields)
  //       : await PostApi.createPost(fields);
  //     const resultId = id ? id : data._id;
  //     navigate(`/posts/${resultId}`);
  //   } catch (e) {
  //     console.warn(e);
  //     alert("Ошибка при создании статьи");
  //   }
  // };
  const onSubmit = ()=>{
    const fields = {
      title,
      imageUrl,
      tags: tags.split(","),
      text
    };
    dispatch(id?updatePostTC({postId:id,payload:fields}):createPostTC({payload:fields}))
         // const resultId = id ? id : data._id;
  }
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
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`${PORT}${imageUrl}`}
            alt="Uploaded"
          />
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
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {id ? "Опубликовать" : "Сохранить"}
        </Button>
        <NavLink to="/">
          <Button size="large">Отмена</Button>
        </NavLink>
      </div>
    </Paper>
  );
};
