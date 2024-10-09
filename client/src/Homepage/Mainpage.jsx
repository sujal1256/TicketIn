import React, { useEffect, useState } from "react";
import MainpageCard from "./MainpageCard";
import useCheckSignedIn from "../utils/useCheckSignedIn";
import axios from "axios";
import { Link } from "react-router-dom";

function Mainpage() {
  const loggedInResponse = useCheckSignedIn();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      const response = await axios.get("/api/v1/project");
      setProjects(response?.data?.data);
    }

    getProjects();
  }, []);

  console.log("projects", projects);

  return (
    <div className="bg-blue-200 w-screen p-12">
      <p className="text-4xl">
        {loggedInResponse?.userLoggedIn
          ? "Hello, Sujal Malhotra"
          : "You are not logged In :("}
      </p>
      {/* your apps */}

      {/* FIXME: Fix this CSS */}
      <div className="mt-8 flex gap-6 w-screen overflow-x-scroll scroll-smooth">
        {projects.map((project, index) => (
          <Link to={"/project?q=" + project._id} key={index}>
            <MainpageCard {...project} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Mainpage;
