import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const { state, dispatch } = useContext(userContext);

  const postData = (e) => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log("invalid");
      return;
    }
    fetch(`/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          // toast(data.error)

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
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user-info", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          history("/");
          toast.success("successfully signed in", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signin">
      <div className="form">
        <h4>Signin</h4>
        <div className="input_filed">
          <label>Email address</label>
          <br></br>
          <input
            type="email"
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
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <input className="chechBox" type="checkbox" required></input>{" "}
          <label>Check me out</label>
          <br></br>
          <Link to="/signup">
            <h5>You not have an account ?</h5>
          </Link>
          <button type="submit" onClick={postData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
