import Container from "react-bootstrap/Container";
import { Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [userDeatils, setUserDeatils] = useState([]);
  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const name = JSON.parse(localStorage.getItem("user-info"));

  const history = useNavigate();
  const logout = () => {
    localStorage.clear();
    history("/login");
  };
  const profileNavigate = () => {
    history("/profile");
  };
  const fetchUser = (query) => {
    setSearch(query);
    fetch(`${window.location.origin}/search-users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserDeatils(result.user);
      });
  };
  return (
    <div className="navBar">
      <div className="nav-logo">
        <Link className="link" to="/">
          <h1>Postgram</h1>
        </Link>
      </div>

      <div className="nav-menu">
        <div className="nav-Input">
          {show ? (
            <div className="search-box">
              <RxCross2
                className="close-btn"
                onClick={() => {
                  setShow(false);
                  setUserDeatils([]);
                }}
              />
              <input
                type="text"
                placeholder="search user"
                value={search}
                onChange={(e) => fetchUser(e.target.value)}
              ></input>

              <ul>
                {userDeatils.map((item, id) => {
                  return (
                    <Link
                      className="link"
                      key={id}
                      to={
                        item._id !== name._id
                          ? "/profile/" + item._id
                          : "/profile"
                      }
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <li>{item.name}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="nav-links">
          {name ? (
            <div className="after-regi">
              <ul>
                <Link className="link" to="/create">
                  <li>Create-Post</li>
                </Link>
                <Link className="link" to="/myfollowerspost">
                  <li>My Following Post</li>
                </Link>
                <Link className="link" to="/">
                  <li>Home</li>
                </Link>
                <Link to="/profile" className="link">
                  <li>Profile</li>
                </Link>
              </ul>
            </div>
          ) : (
            <div className="befor-regi">
              <ul>
                <Link className="link " to="/login">
                  <li className="login">Signin</li>
                </Link>
                <Link className="link " to="/signup">
                  <li className="login">Signup</li>
                </Link>
              </ul>
            </div>
          )}
        </div>

        {name ? (
          <>
            {sidebar ? (
              <div className=" side-link">
                <RxCross2
                  className="close-side"
                  onClick={() => setSidebar(false)}
                ></RxCross2>
                <ul onClick={() => setSidebar(false)}>
                  <Link className="link" to="/">
                    <li>Home</li>
                  </Link>
                  <Link to="/profile" className="link">
                    <li>Profile</li>
                  </Link>
                  <Link className="link" to="/create">
                    <li>Create-Post</li>
                  </Link>
                  <Link className="link" to="/myfollowerspost">
                    <li>My Following Post</li>
                  </Link>
                </ul>
              </div>
            ) : null}
          </>
        ) : null}

        <Nav className="nav-dropDown">
          {name ? (
            <>
              <RxHamburgerMenu
                className="side-nav"
                onClick={() => setSidebar(!sidebar)}
              />
              <IoSearchOutline
                className="search-icon"
                onClick={() => setShow(!show)}
              />
              <div className="user-profile">
                {name.pic ? (
                  <img src={name.pic}></img>
                ) : (
                  <img src="https://res.cloudinary.com/dqsgpoznr/image/upload/v1724486653/iuqhrseu5vi4u3wpohcd.png"></img>
                )}

                <NavDropdown className="drop-title" title={name && name.name}>
                  <div className="drop-item">
                    <NavDropdown.Item
                      className="drop-item"
                      onClick={profileNavigate}
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item className="drop-item" onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              </div>
            </>
          ) : null}
        </Nav>
      </div>
    </div>
  );
}
