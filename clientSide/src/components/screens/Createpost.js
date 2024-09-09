import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const history = useNavigate();

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log(data.error);
          } else {
            history("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);
  const postDetails = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="createPost">
      <div className="form">
        <h4>Create-post</h4>
        <div className="input_filed">
          <label>Title</label>
          <br></br>
          <input
            className="input"
            type="text"
            placeholder="Enter title here"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br></br>
          <label>Body</label>
          <br></br>
          <input
            type="file"
            accept=".jpg, .img, .png, .svg"
            placeholder=""
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <br></br>
          <button onClick={() => postDetails()}>Submit</button>
        </div>
      </div>
    </div>
  );
}
