import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function NewMember(props) {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    // TODO server will call logged in user via the auth header in order to set project owner
    const formData = {
      teamMemberEmailToAdd: emailInput
    };

    try {
      const token = sessionStorage.getItem('project-management.token');

      // TODO add email service
      const response = await fetch(
        `http://localhost:4000/api/v1/project/${props.project._id}`, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          method: "PUT",
          body: JSON.stringify(formData)
        }
      );

      const responseJSON = await response.json();
      const project = responseJSON.project;

      if(response.status === 200) {
        props.onProjectChanged(project)
        // navigate(`/project/${project._id}`, { replace: true, state: { project } });
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
      <div className="flex justify-center h-full items-center">
        <div className="flex">
          <form className="grid gap-y-4 grid-cols-1 text-center">
            <h1 className="flex text-xl">New Member</h1>
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="mr-auto ml-auto rounded-sm w-[500px] border-gray-300 border solid"
              type="text"
              name="email"
              id="email"
              placeholder="Email" />
            <div>
              <button onClick={ submitForm } className="w-[500px] bg-blue-500 rounded-sm">
                Invite
              </button>
            </div>
            <div className="text-red-500 text-center">{ errorMessage }</div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewMember