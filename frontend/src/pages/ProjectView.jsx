import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          const { project } = res.data;
          setTitle(project.title);
          setDescription(project.description);
          setStack(project.stack);
          setDeployed(project.deployed);
          setTechnologies(project.technologies);
          setGitRepoLink(project.gitRepoLink);
          setProjectLink(project.projectLink);
          setProjectBanner(project.projectBanner?.url);
          setProjectBannerPreview(project.projectBanner?.url);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-5">
      {/* Back Button */}
      <div className="self-end mb-6">
        <Button onClick={handleReturnToPortfolio} className="bg-sky-600 text-white">
          Return to Portfolio
        </Button>
      </div>

      {/* Project Banner */}
      <div className="w-full max-w-[1000px]">
        <img
          src={projectBannerPreview || "/avatarHolder.jpg"}
          alt="Project Banner"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Project Details */}
      <div className="mt-10 w-full max-w-[1000px] space-y-8 bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-2 text-center">{title}</h1>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {descriptionList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Technologies</h2>
          <ul className="flex flex-wrap gap-3">
            {technologiesList.map((tech, index) => (
              <li
                key={index}
                className="px-3 py-1 bg-sky-800 rounded-full text-sm shadow"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Stack</h2>
          <p className="text-gray-300">{stack}</p>
        </div>

        {/* Deployment Status */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Deployed</h2>
          <p className="text-gray-300">{deployed || "Not deployed"}</p>
        </div>

        {/* GitHub Repo Link */}
        <div>
          <h2 className="text-xl font-semibold mb-3">GitHub Repository</h2>
          <Link
            to={gitRepoLink}
            target="_blank"
            className="text-sky-400 underline"
          >
            {gitRepoLink || "No repository available"}
          </Link>
        </div>

        {/* Project Link */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Live Project</h2>
          <Link
            to={projectLink}
            target="_blank"
            className="text-sky-400 underline"
          >
            {projectLink || "No live project available"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
