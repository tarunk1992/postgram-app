import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import CommentPopup from "./CommentPopup";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const { state, dispatch } = useContext(userContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState();
  const [comment, setComment] = useState("");

  //  X9NB5L4EAR3939G1S5T4CNY2

  useEffect(() => {
    fetch(`${window.location.origin}/allpost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch(`${window.location.origin}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json()) // Properly return res.json()
      .then((result) => {
        console.log("result", result);
        localStorage.setItem("user", JSON.stringify(result));
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.error("Error liking post:", err);
      });
  };

  const unlikePost = (id) => {
    fetch(`${window.location.origin}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json()) // Properly return res.json()
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.error("Error unliking post:", err);
      });
  };

  const commentShow = (id) => {
    if (id) {
      setShow(true);
    }
  };

  const reverseData = [...data].reverse();

  return (
    <div className="home">
      {reverseData.map((item) => {
        return (
          <div className="card" key={item._id}>
            <Link
              className="link"
              to={
                item.postedBy._id !== state._id
                  ? "/Profile/" + item.postedBy._id
                  : "/profile"
              }
            >
              <h5>{item.postedBy.name}</h5>
            </Link>

            <div className="image-card">
              <Link
                className="link"
                to={
                  item.postedBy._id !== state._id
                    ? "/Profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                <img src={item.photo} alt="loading..."></img>
              </Link>
            </div>
            <div className="card-contain">
              <div className="likes-comments">
                <div>
                  {item.likes.includes(state._id) ? (
                    <>
                      <FaHeart
                        className="like"
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                      />
                    </>
                  ) : (
                    <FaRegHeart
                      onClick={() => {
                        likePost(item._id);
                      }}
                    />
                  )}
                  <span className="span">{item.likes.length} likes </span>
                </div>

                <CommentPopup
                  className="Comment-Popup"
                  id={item._id}
                  item={item}
                  setData={setData}
                  data={data}
                ></CommentPopup>
              </div>

              <h6>{item.title}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}
