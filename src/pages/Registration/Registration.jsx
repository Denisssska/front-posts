import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "../Login/Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registrationTC } from "../../store/slices/userReducer";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { initUser } from "../../selectors/userSelector";
import { CssTextField } from "../textFieldStyle";


export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const { registration } = useSelector(state => state.user);
  const { status } = useSelector(initUser.registration);
  const isCreated = status === "registered";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: ""
    },
    mode: "onChange"
  });
  const onSubmit = async (value) => {
    const data = await dispatch(registrationTC(value));
    if (!data.payload) {
      alert("Не удалось зарегистрироваться...");
    }
    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
    } else {
      alert("Не удалось зарегистрироваться...");
    }
  };
  if (isCreated) {
    navigate("/");
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CssTextField
          variant="filled"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите имя" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <CssTextField
          variant="filled"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <CssTextField
          variant="filled"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <button type="submit" disabled={!isValid} className={!isValid ? styles.disable : styles.enable}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Зарегистрироваться
        </button>

      </form>
      {status !== "registration" && status !== "registered" &&
        <Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }} message={status} />}
    </Paper>
  );
};
