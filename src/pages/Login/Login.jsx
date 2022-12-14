import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../store/slices/userReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Snackbar } from "@mui/material";
import { initUser } from "../../selectors/userSelector";
import { CssTextField } from "../textFieldStyle";
import Button from "@mui/material/Button";

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(initUser.login);
  const isRegistered = status === "success";

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "", password: ""
    }, mode: "onChange"
  });

  const onSubmit = async (values) => {
    const data = await dispatch(loginTC(values));
    if (!data.payload) {
      alert("Не удалось авторизироваться...");
    }
    if (localStorage.getItem("token") || "token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Не удалось авторизоваться...");
    }
  };

  if (isRegistered) {
    navigate("/");
  }

  return (
    <>
      {status !== "success" && status !== "loading" &&
        <Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  message={status} />
      }
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CssTextField
            variant="filled"
            type="email" className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register("email", { required: "Укажите почту" })}
            fullWidth
          />
          <CssTextField
            variant="filled"
            {...register("password", { required: "Укажите пароль" })}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message} className={styles.field}
            label="Пароль"
            fullWidth />

          <button type="submit" disabled={!isValid} className={!isValid ? styles.disable : styles.enable}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>

          <NavLink className={styles.navLink} to="/forgot">Забыли пороль?</NavLink>
        </form>
      </Paper>
    </>

  );
};
