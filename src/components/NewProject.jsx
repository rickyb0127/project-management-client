import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function NewProject(props) {
  const navigate = useNavigate();
  const [projectTitleInput, setProjectTitleInput] = useState("");
  const [projectDescriptionInput, setProjectDescriptionInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    // TODO server will call logged in user via the auth header in order to set project owner
    const formData = {
      title: projectTitleInput,
      description: projectDescriptionInput
    };

    try {
      const token = sessionStorage.getItem('project-management.token');

      const response = await fetch(
        "http://localhost:4000/api/v1/project/new", 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          method: "POST",
          body: JSON.stringify(formData)
        }
      );

      const responseJSON = await response.json();
      const project = responseJSON.project;

      if(response.status === 200) {
        navigate(`/project/${project._id}`, { replace: true, state: { project } });
      } else {
        setErrorMessage(responseJSON.error);
      }

      return;
    } catch(err) {
      // this returns unhandled server errors
      console.log(err)
    }
  };

  return (
    <>
      <div className="flex justify-center py-2">
        <form className="grid gap-y-4 grid-cols-1 text-center">
          <h1 className="flex text-xl">New Project Details</h1>
          <input
            value={projectTitleInput}
            onChange={(e) => setProjectTitleInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[500px] border-gray-300 border solid"
            type="text"
            name="projectTitle"
            id="projectTitle"
            placeholder="Project Name (Required)" />
          <textarea
            value={projectDescriptionInput}
            onChange={(e) => setProjectDescriptionInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[500px] h-[200px] border-gray-300 border solid"
            type="text"
            name="projectDescription"
            id="projectDescription"
            placeholder="Project Description (Required)" />
          <div>
            <button onClick={ submitForm } className="w-[500px] bg-blue-500 rounded-sm">
              Create Project
            </button>
          </div>
          <div className="text-red-500 text-center">{ errorMessage }</div>
        </form>
      </div>
    </>
  )
}

export default NewProject