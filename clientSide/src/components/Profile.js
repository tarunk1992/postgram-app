import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function Profile() {
  const [mypic, setMypic] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const name = JSON.parse(localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user-info"));
  console.log("pro", user);

  useEffect(() => {
    fetch(`${window.location.origin}/mypost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      res.json().then((result) => {
        setMypic(result.mypost);
      });
    });
  }, [mypic]);

  const deletePost = (postId) => {
    fetch(`${window.location.origin}/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const newData = mypic.filter((item) => {
          return item._id !== res._id;
        });
        setMypic(newData);
      });
  };

  const reversePic = [...mypic].reverse();

  return (
    <div className="profile">
      <div className="head-section">
        <div className="profile-section">
          {user.pic ? (
            <img src={user.pic}></img>
          ) : (
            <img src="https://res.cloudinary.com/dqsgpoznr/image/upload/v1724486653/iuqhrseu5vi4u3wpohcd.png"></img>
          )}

          <h5>{state ? state.name : "loading"}</h5>
        </div>
        <div className="follow-details">
          <div className="follow-section">
            <div className="post">
              <h3>{mypic.length}</h3>
              <p>posts</p>
            </div>
            <div className="post">
              <h3>{user ? user.followers.length : "0"}</h3>
              <p>followers</p>
            </div>
            <div className="post">
              <h3>{user ? user.following.length : "0"}</h3>
              <p>following</p>
            </div>
          </div>
          <div className="follo-btn">
            <Link to="/uploadpic">
              {" "}
              <button>Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="gallery-section">
        {reversePic.map((image) => {
          return (
            <>
              <div className="pics">
                <img key={image._id} src={image.photo} alt={image.title}></img>

                <FaHeart className="like-btn"></FaHeart>
                <MdDelete
                  onClick={() => deletePost(image._id)}
                  className="delet-btn"
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
