import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { UserApi } from "../../api/userApi";
import Avatar from "@mui/material/Avatar";
import { PORT } from "../../api/instance";
import { TextField } from "@mui/material";
import { updateUserStateTC } from "../../store/slices/userReducer";
import { savePhotoOnServer } from "../../utils/savePhotoOnServer";
import { initUser } from "../../selectors/userSelector";
import { ColorButton } from "../../components/Header/buttonStyle";

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
  const dispatch = useDispatch();
  const { items } = useSelector(initUser.login);
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(items.avatarUrl);
  const [fullName, setFullName] = useState(items.fullName);
  const [disabled, setDisabled] = useState(true);

  const handleChangePhoto = async (event) => {
    const data = await savePhotoOnServer(event);
    setAvatarUrl(data);
    setDisabled(false);
  };
  const changeName = (e) => {
    setDisabled(false);
    setFullName(e.currentTarget.value);

  };
  const submit = async () => {
    try {
      await UserApi.changeUserPhotoAndName(items._id, avatarUrl, fullName);
      setDisabled(true);
      dispatch(updateUserStateTC({ fullName, avatarUrl }));
    } catch (e) {
      console.warn();
      alert("Ошибка при создании фото профиля");
    }
  };
  return (
    <span>
      <ColorButton variant="outlined" onClick={() => setOpen(true)}>Изменить профиль</ColorButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <input ref={inputFileRef} type="file" onChange={handleChangePhoto} hidden />
          {avatarUrl || items.avatarUrl ?
            <Avatar
              alt="Ava"
              src={`${PORT}${avatarUrl || items.avatarUrl}`}
              sx={{ width: 156, height: 156 }}
              style={{ margin: "2% auto", display: "block" }}
            /> :
            <Avatar style={{ margin: "2% auto" }} sx={{ width: 156, height: 156 }} />}
          <TextField style={{ margin: "0 auto", display: "block", textAlign: "center" }}
                     size="small" placeholder="Изменить имя" value={fullName}
                     onChange={(e) => changeName(e)} />
          <Button onClick={() => inputFileRef.current.click()}
                  style={{ margin: "0 auto", display: "block", textAlign: "center" }}>
            Изменить фото профиля
          </Button>
          <Button

            disabled={disabled}
            onClick={submit}
            style={{ margin: "0 auto", display: "block", textAlign: "center" }}>
            Сохранить изменения
          </Button>
        </Box>
      </Modal>
    </span>
  );
};

