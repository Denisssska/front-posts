import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import styles from "../Login/Login.module.scss";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createNewPasswordTC } from "../../store/slices/changePasswordReducer";
import { initPassword } from "../../selectors/passwordSelector";
import { CssTextField } from "../textFieldStyle";

export const CreatePasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { status } = useSelector(initPassword.item);
  const isCreated = status === "created";
  const id = location.pathname.split("/")[2];
  const token = location.pathname.split("/")[3];
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "", password: ""
    }, mode: "onChange"
  });
  const onSubmit = (values) => {
    dispatch(createNewPasswordTC({ password: values.password, token, id }));
  };

  return (
    <Paper classes={{ root: styles.root }}>
      {isCreated ? <>
          <Typography classes={{ root: styles.title }} variant="h5">
            Пароль успешно изменен!
          </Typography>
          <button style={{ borderRadius: "5px" }} type="submit" className={styles.enable}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <NavLink className={styles.navLink} style={{ textDecoration: "none", color: "yellow" }} to={"/login"}>Вернуться
              на страницу
              авторизации...</NavLink>
          </button>
        </> :
        <>
          <Typography classes={{ root: styles.title }} variant="h5">
            Создайте новый пороль
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CssTextField
              variant="filled"
              {...register("password", { required: "Укажите пароль" })}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message} className={styles.field}
              label="Пароль"
              fullWidth />
            {/*<Button type="submit" size="large" variant="contained" fullWidth>*/}
            {/*  Войти*/}
            {/*</Button>*/}
            <button type="submit" className={styles.enable}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Создать
            </button>
          </form>
        </>

      }


    </Paper>
  );
};

