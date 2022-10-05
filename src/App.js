import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import {Route, Routes} from "react-router-dom";
import { useEffect } from "react";
import { getPostsTC, getTagsTC } from "./store/slices/postsReducer";
import { useAppDispatch } from "./hooks/Hooks";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPostsTC());
    dispatch(getTagsTC());
  }, []);
    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path='/posts/:id' element={<FullPost/>}/>
                    <Route path={'/add-post'} element={<AddPost/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                </Routes>

            </Container>
        </>
    );
}

export default App;
