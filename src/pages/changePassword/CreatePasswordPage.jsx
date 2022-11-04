import React from "react";
import { useLocation, useParams } from "react-router-dom";

export const CreatePasswordPage = () => {
  const location= useLocation()
  console.log(location);
  const id = location.pathname.split('/')[2];
  const token = location.pathname.split('/')[3];
  console.log(id);
  console.log(token);
  return (
    <div>
this page for create password
    </div>
  );
};

