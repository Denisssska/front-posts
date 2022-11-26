import React from "react";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutTC } from "../../store/slices/userReducer";
import { BasicModal } from "../../pages/profilePage/ProfilePage";
import { changePostsStatus, changeSortBy } from "../../store/slices/postsReducer";
import { initUser } from "../../selectors/userSelector";
import { ColorButton } from "./buttonStyle";

export const Header = () => {
  const login = useSelector(initUser.login);
  const registration = useSelector(initUser.registration);
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
          <NavLink onClick={() => handleClick("createdAt")} className={styles.logo} to="/">
            <div>BLOG</div>
          </NavLink>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <BasicModal user={login.items} />
                <NavLink to="/add-post">
                  <ColorButton onClick={() => dispatch(changePostsStatus())} variant="outlined">Написать
                    статью</ColorButton>
                </NavLink>
                <ColorButton onClick={onClickLogout} variant="outlined">
                  Выйти
                </ColorButton>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <ColorButton variant="outlined">
                    Войти
                  </ColorButton>
                </NavLink>
                <NavLink to="/register">
                  <ColorButton variant="outlined">Создать аккаунт</ColorButton>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
