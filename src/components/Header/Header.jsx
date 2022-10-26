import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutTC } from "../../store/slices/userReducer";
import { BasicModal } from "../../pages/ProfilePage";
import { changeSortBy } from "../../store/slices/postsReducer";

export const Header = () => {
  const { login, registration } = useSelector(state => state.user);

  const isAuth = login.status === "success" || registration.status === "registered";
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logoutTC());
      localStorage.removeItem("token");
    }
  };
  const handleClick = (sorts) => {
    dispatch(changeSortBy(sorts));
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <NavLink onClick={() => handleClick('createdAt')} className={styles.logo} to="/">
            <div>BLOG</div>
          </NavLink>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <BasicModal user={login.items} />
                <NavLink to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </NavLink>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <Button variant="outlined">Войти</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
