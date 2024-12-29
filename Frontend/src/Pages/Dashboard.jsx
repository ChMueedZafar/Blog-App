// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../Dasbboard/Slidbar";
import MyProfile from "../Dasbboard/MyProfile";
import MyBlogs from "../Dasbboard/MyBlogs";
import CreateBlog from "../Dasbboard/CreateBlogs";
import UpdateBlog from "../Dasbboard/Update";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log(profile);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard;