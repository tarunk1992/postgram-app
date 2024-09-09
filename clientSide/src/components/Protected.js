import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  let Cmp = props.Cmp;
  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history("/login");
    }
  });
  return (
    <div>
      <Cmp></Cmp>
    </div>
  );
}
