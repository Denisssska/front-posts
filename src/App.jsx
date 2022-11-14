import Container from "@mui/material/Container";
import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authMeTC } from "./store/slices/userReducer";
import { ForgotPasswordPage } from "./pages/changePassword/ForgotPasswordPage";
import { CreatePasswordPage } from "./pages/changePassword/CreatePasswordPage";
import { initUser } from "./selectors/userSelector";


function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(initUser.registration);
  useEffect(() => {
    dispatch(authMeTC());
  }, [status]);
  return (
    <>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="/create-password/*" element={<CreatePasswordPage />} />
            <Route path="/tags/:tag" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Container>
    </>
  );
}

export default App;
