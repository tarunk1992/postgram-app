import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./screens/Navbar";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Profile from "./Profile";
import Createpost from "./screens/Createpost";

import Protected from "./Protected";
import Userprofile from "./UserProfile";
import SubscriberUser from "./screens/SubscriberUser";
import Uploadpic from "./screens/Uploadpic";

function Routing() {
  return (
    <div className="Routing">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Protected Cmp={Home}></Protected>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/Profile/:userid"
            element={<Userprofile></Userprofile>}
          ></Route>
          <Route
            path="/profile"
            element={<Protected Cmp={Profile}></Protected>}
          ></Route>
          <Route
            path="/create"
            element={<Protected Cmp={Createpost}></Protected>}
          ></Route>
          <Route
            path="/myfollowerspost"
            element={<Protected Cmp={SubscriberUser}></Protected>}
          ></Route>
          <Route
            path="/uploadpic"
            element={<Protected Cmp={Uploadpic}></Protected>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
