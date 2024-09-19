import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

export default function Uploadpic() {
  const [image, setImage] = useState("");

  const { state, dispatch } = useContext(userContext);

 
  const history = useNavigate();

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dqsgpoznr");
      fetch("https://api.cloudinary.com/v1_1/dqsgpoznr/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(`https://post-backend-sl1s.onrender.com/updatepic`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("pic", result);
              localStorage.setItem(
                "user-info",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  // const Updatephoto =(file)=>{
  //   setImage(file)
  //   }
  const Update = () => {
    history("/profile");
  };

  return (
    <div className="createPost">
      <div className="form">
        <h4>Upload-profile</h4>
        <div className="input_filed">
          <span>Photo</span>
          <br></br>

          <input
            type="file"
            accept=".jpg, .img, .png, .svg"
            placeholder=""
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <br></br>
          <button onClick={() => Update()}>Update Profile</button>
        </div>
      </div>
    </div>
  );
}
