import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App";

export default function Userprofile() {
  const { userid } = useParams();
  const { state, dispatch } = useContext(userContext);
  const follo = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState(null);
  const [show, setShow] = useState(
    follo?.following ? !follo.following.includes(userid) : true
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/user/${userid}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        const result = await res.json();
        setProfile(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchProfile();
  }, [userid]);

  const followUser = () => {
    fetch(`/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userid }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: result.following,
            followers: result.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(result));

        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...(prevState.user?.followers || []), result._id],
          },
        }));
        setShow(false);
      })
      .catch((error) => {
        console.error("Error following user:", error);
      });
  };

  const unfollowUser = () => {
    fetch(`/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ unfollowId: userid }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: result.following,
            followers: result.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(result));
        setProfile((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            followers:
              prevState.user?.followers?.filter(
                (item) => item !== result._id
              ) || [],
          },
        }));
        setShow(true);
      })
      .catch((error) => {
        console.error("Error unfollowing user:", error);
      });
  };

 

  return (
    <>
      {profile ? (
        <div className="profile">
          <div className="head-section">
            <div className="profile-section">
              {profile.user.pic ? (
                <img src={profile.user.pic} />
              ) : (
                <img src="https://res.cloudinary.com/dqsgpoznr/image/upload/v1724486653/iuqhrseu5vi4u3wpohcd.png"></img>
              )}

              <h5>{profile.user.name}</h5>
              <h6>{profile.user.email}</h6>
            </div>
            <div className="follow-details">
              <div className="follow-section">
                <div className="post">
                  <h3>{profile.posts.length}</h3>
                  <p>posts</p>
                </div>
                <div className="post">
                  <h3>{profile.user.followers.length}</h3>
                  <p>followers</p>
                </div>
                <div className="post">
                  <h3>{profile.user.following.length}</h3>
                  <p>following</p>
                </div>
              </div>
              <div className="follo-btn">
                {show ? (
                  <button onClick={followUser}>Follow</button>
                ) : (
                  <button onClick={unfollowUser}>Unfollow</button>
                )}
              </div>
            </div>
          </div>
          <div className="gallery-section">
            
              {profile.posts.map((image) => (
                <div key={image._id} className="pics">
                <img  src={image.photo} alt={image.title} />
                </div>
              ))}
          
          </div>
        </div>
      ) : (
        <h3>Profile Loading....</h3>
      )}
    </>
  );
}
