import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import styles from "../Login/Login.module.scss";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserApi } from "../../api/userApi";
import { ChangePassword } from "../../api/password.api";

export const CreatePasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreated = useSelector(state => state.password.status === "created");
  console.log();
  const id = location.pathname.split("/")[2];
  const token = location.pathname.split("/")[3];
  //console.log(id);
  //console.log(token);
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "", password: ""
    }, mode: "onChange"
  });
  const onSubmit = async (values) => {
    console.log(values.password);
    const {data} = await ChangePassword.createPass(values.password,token,id)
    console.log(data);
    // const data = await dispatch(loginTC(values));
    // if(!data.payload){
    //   alert('Не удалось авторизироваться...')
    // }
    // if(localStorage.getItem('token')|| 'token' in data.payload){
    //   window.localStorage.setItem('token',data.payload.token)
    // }else{
    //   alert('Не удалось авторизоваться...')
    // }
  };
  //
  if (isCreated) {
    navigate("/login");
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создайте новый пороль
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<TextField*/}
        {/*  type="email"*/}
        {/*  className={styles.field}*/}
        {/*  label="E-Mail"*/}
        {/*  error={Boolean(errors.email?.message)}*/}
        {/*  helperText={errors.email?.message}*/}
        {/*  {...register("email", { required: "Укажите почту" })}*/}
        {/*  fullWidth*/}
        {/*/>*/}
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

