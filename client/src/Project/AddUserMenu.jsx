import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function AddUserMenu() {
  const [email, setEmail] = useState("");

  const handleAddUser = async function (e) {
    // e.preventDefault();
    console.log(e);
    const url = window.location.href;
    const projectID = new URLSearchParams(url.slice(url.indexOf("?"))).get("q");

    console.log(projectID);

    const response = await axios
      .post("api/v1/project/add-user-to-project", {
        projectID: projectID.trim(),
        email: email.trim(),
      })
      .catch((error) => toast.error(error?.response?.data?.message));

    console.log("Hello");

    toast.success(response.message);
  };

  return (
    <div className="absolute top-[120%] bg-white w-[400%] p-2">
      <ToastContainer />
      <p className="text-sm">Enter the user email of you want to add</p>
      <input
        type="text"
        name="AddUserEmail"
        onChange={(e) => setEmail(e.target?.value)}
        className="w-full bg-gray-300 mt-2"
      />
      <button
        className="bg-blue-800 w-3/4 mx-auto text-white"
        onClick={handleAddUser}
      >
        Add User
      </button>
    </div>
  );
}

export default AddUserMenu;
