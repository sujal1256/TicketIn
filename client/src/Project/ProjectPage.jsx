import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectSidebar from "./ProjectSidebar";
import ProjectBoard from "./ProjectBoard";
import { useDispatch } from "react-redux";
import { storeProject, removeProject } from "../redux/projectSlice";
function ProjectPage() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProjectDetails() {
      const response = await axios
        .get("/api/v1/project/get-project-details", {
          params: {
            q: searchParams.get("q"),
          },
        })
        .catch((error) => {
          console.log("Error while getting project data" + error.message);
        });
      setDetails(response.data.data);
      dispatch(storeProject(response?.data?.data));
    }

    getProjectDetails();

    return () => {
      dispatch(removeProject());
    };
  }, []);

  if (!details) {
    return;
  }
  return (
    <div className="flex">
      <ProjectSidebar />
      <ProjectBoard />
    </div>
  );
}

export default ProjectPage;
