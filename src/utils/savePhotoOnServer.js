import { UserApi } from "../api/userApi";

export const savePhotoOnServer = async (event) => {
  try {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("image", file);
    const  data  = await UserApi.updateUserFile(formData);
    console.log(data.data.url);
    return data.data.url;
  } catch (e) {
    console.warn(e);
    alert("Ошибка при загрузке файла");
  }
};