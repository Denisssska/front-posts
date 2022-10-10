import Container from "@mui/material/Container";
import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getPostsTC, getTagsTC } from "./store/slices/postsReducer";
import { useDispatch } from "react-redux";
import { authMeTC } from "./store/slices/userReducer";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authMeTC())
    // dispatch(getPostsTC());
    // dispatch(getTagsTC());
  }, []);
    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/posts/:id' element={<FullPost/>}/>
                    <Route path='/add-post' element={<AddPost/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Registration/>}/>
                </Routes>

            </Container>
        </>
    );
}

export default App;
