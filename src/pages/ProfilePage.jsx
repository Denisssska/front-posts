import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { UserApi } from "../api/userApi";
import Avatar from "@mui/material/Avatar";
import { PORT } from "../api/instance";
import { authMeTC } from "../store/slices/userReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export const BasicModal = () => {
  const { items } = useSelector(state => state.user.login);

  //const { items } = useSelector(state => state.user.login);
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {

    setOpen(false);
  };

  const inputFileRef = useRef(null);

  const handleChangePhoto = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await UserApi.updateUserFile(formData);
      setAvatarUrl(data.url);
    } catch (e) {
      console.warn(e);
      alert("Ошибка при загрузке файла");

    }
  };
  const submit = async () => {
    try {
      const { data } = await UserApi.changeUserPhoto(items._id, avatarUrl);
      console.log(data);
      setAvatarUrl("");
    } catch (e) {
      console.warn();
      alert("Ошибка при создании фото профиля");
    }
  };
  return (
    <span>
      <Button variant={"contained"} onClick={handleOpen}>Изменить профиль</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <input ref={inputFileRef} type="file" onChange={handleChangePhoto} hidden />
          <Avatar
            alt="Ava"
            src={`${PORT}${avatarUrl || items.avatarUrl}`}
            sx={{ width: 156, height: 156 }}
            style={{ margin: "0 auto", display: "block" }}
          />
          {/*<img style={{ margin: "0 auto", display: "block" }} src={items.avatarUrl} alt="" />*/}
          <Button onClick={() => inputFileRef.current.click()}
                  style={{ margin: "0 auto", display: "block", textAlign: "center" }}>
            Изменить фото профиля
          </Button>
          <Button disabled={!avatarUrl.length} onClick={submit}
                  style={{ margin: "0 auto", display: "block", textAlign: "center" }}>
            Сохранить изменения
          </Button>
        </Box>
      </Modal>
    </span>
  );
};

