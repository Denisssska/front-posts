import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import styles from "../Login/Login.module.scss";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangePassword } from "../../api/password.api";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: ""
    }, mode: "onChange"
  });
  const onSubmit =  async (values) => {
    //console.log(values.email);
    const {data} = ChangePassword.forgotPass(values.email)
    // const data = await dispatch(forgotPasswordTC(values));
    console.log(data);
  };
   return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Забыли пороль?
      </Typography>
      <Typography classes={{ root: styles.title }} variant="h5">
        Мы пришлем вам ссылку на указанный email.
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
              <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Отправить
        </Button>
        <NavLink to="/login">Вернуться к авторизации</NavLink>
      </form>

    </Paper>
  );
};

