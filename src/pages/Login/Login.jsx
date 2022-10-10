import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../store/slices/userReducer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useSelector(state => state.user);
  const isRegistered = login.status === "success";
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "", password: ""
    }, mode: "onChange"
  });
  const onSubmit = async (values) => {
   const data = await dispatch(loginTC(values));
   if(!data.payload){
     alert('Не удалось авторизироваться...')
   }
    if( 'token' in data.payload){
      window.localStorage.setItem('token',data.payload.token)
    }else{
      alert('Не удалось авторизоваться...')
    }
  };

  if (isRegistered) {
    navigate("/");
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          {...register("password", { required: "Укажите пароль" })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message} className={styles.field}
          label="Пароль"
          fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>

    </Paper>
  );
};