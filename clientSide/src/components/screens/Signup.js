import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const history = useNavigate();

  useEffect(() => {
    if (url) {
      uploadField();
    }
  }, [url]);

  const uploadPic = () => {
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
  const uploadField = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log("invalid");
      return;
    }
    fetch(`${window.location.origin}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(data.error, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
          });
        } else {
          history("/login");
        }
        toast.success(data.message, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postData = (e) => {
    if (image) {
      uploadPic();
    } else {
      uploadField();
    }
  };
  return (
    <div className="signUp">
      <div className="form">
        <h4>Signup</h4>
        <div className="input_filed">
          <label>Full Name</label>
          <br></br>
          <input
            type="text"
            className="input"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br></br>
          <label>Email address</label>
          <br></br>
          <input
            type="email"
            className="input"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br></br>
          <label>Password</label>
          <br></br>
          <input
            type="password"
            className="input"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <label>Profile Photo</label>
          <br></br>
          <input
            type="file"
            accept=".jpg, .img, .png, .svg"
            placeholder=""
            className="input"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <br></br>
          <input className="chechBox" type="checkbox" required></input>{" "}
          <label>Check me out</label>
          <br></br>
          <Link to="/login">
            <h5>Already have an account ?</h5>
          </Link>
          <button type="submit" onClick={postData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
