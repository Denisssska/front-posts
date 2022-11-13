import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import styles from "../Login/Login.module.scss";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { forgotPasswordTC } from "../../store/slices/changePasswordReducer";
import { useDispatch, useSelector } from "react-redux";
import { initPassword } from "../../selectors/passwordSelector";


export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(initPassword.item);
  const isSendEmail = message === "Email sent successfully";
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: ""
    }, mode: "onChange"
  });
  const onSubmit = (values) => {
    dispatch(forgotPasswordTC({ email: values.email }));
  };
  return (
    <Paper classes={{ root: styles.root }}>
      {isSendEmail ? <>
          <Typography classes={{ root: styles.title }} variant="h5">
            Мы отправили на почту письмо. Пройдите по ссылке для дальнейших действий!
          </Typography>
          <NavLink to="/login">Вернуться к авторизации</NavLink>
        </>
        :
        <>
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

        </>}

    </Paper>
  );
};

