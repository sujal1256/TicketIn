import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";


function AddUserMenu() {
  const [email, setEmail] = useState("");
  const [searchParams] = useSearchParams();

  const handleAddUser = async function (e) {
    // e.preventDefault();
    const projectID = searchParams.get("q");

    const response = await axios
      .post("api/v1/project/add-user-to-project", {
        projectId: projectID.trim(),
        email: email.trim(),
      })
      .catch((error) => toast.error(error?.response?.data?.message));

    console.log(response);

    toast.success(response?.data?.data.message);
  };

  return (
    <div className="absolute top-[120%] bg-white w-48 p-5">
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
