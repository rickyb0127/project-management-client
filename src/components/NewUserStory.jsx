import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NewUserStory(props) {
  const navigate = useNavigate();
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("NEW");
  const [selectedAssigned, setSelectedAssigned] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [pointsInput, setPointsInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(!selectedAssigned) {
      const elem = document.getElementById("assign-dropdown");

      if(showAssignDropdown) {
        elem.classList.remove("hidden")
      } else {
        elem.classList.add("hidden")
      }
    }
  }, [showAssignDropdown, selectedAssigned]);

  const selectableTeamMembers = props.project.teamMembers.map((member) => {
    return (
      <div key={member._id} className="flex items-center">
        <div className="h-12 w-12">
          <img className="cursor-pointer h-12 w-12 rounded-full border border-white border-solid" src={ member.imgUrl } />
        </div>
        <div onClick={ () => setSelectedAssigned(member) } className="pl-2">
          {member.firstName} {member.lastName}
        </div>
      </div>
    )
  });

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      projectId: props.project._id,
      title: titleInput,
      description: descriptionInput,
      assigned: selectedAssigned,
      status: selectedStatus,
      numPoints: pointsInput
    };

    try {
      const token = sessionStorage.getItem('project-management.token');

      // TODO add email service
      const response = await fetch(
        `http://localhost:4000/api/v1/user-stories/new`, 
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
      const userStory = responseJSON.userStory;

      if(response.status === 200) {
        props.onUserStoriesChanged(userStory)
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
        <div className="flex w-full">
          <form className="flex flex-col text-center gap-[30px] w-full">
            <h1 className="flex text-xl self-center">New User Story</h1>
            <div className="flex flex-row gap-[30px]">
              <div className="flex flex-col gap-[30px] w-[70%]">
                <input
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="mr-auto ml-auto rounded-sm w-full border-gray-300 border solid"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title" />
                <textarea
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  className="mr-auto ml-auto rounded-sm w-full border-gray-300 border solid"
                  rows="5"
                  name="title"
                  id="title"
                  placeholder="Story Description" />
                <div>
                  Attachments
                </div>
              </div>
              <div className="flex flex-col gap-[30px] w-[30%]">
                <select className="bg-gray-700 text-white h-[34px]" name="statue" id="statue" value={ selectedStatus } onChange={e => setSelectedStatus(e.target.value)}>
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="READY_FOR_TEST">Ready for Test</option>
                  <option value="DONE">Done</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <div>
                  {selectedAssigned ?
                    <div className="flex items-center">
                      <div className="h-12 w-12">
                        <img className="cursor-pointer h-12 w-12 rounded-full border border-white border-solid" src={ selectedAssigned.imgUrl } />
                      </div>
                      <div className="pl-2">
                        {selectedAssigned.firstName} {selectedAssigned.lastName}
                        <button className="pl-[10px]" onClick={ () => {setSelectedAssigned(null)} }><FontAwesomeIcon className="text-[16px]" icon="fa-solid fa-xmark" /></button>
                      </div>
                    </div> :
                    <span className="cursor-pointer text-blue-400 relative" onClick={() => showAssignDropdown ? setShowAssignDropdown(false) : setShowAssignDropdown(true)}>
                      Assign
                      <div id="assign-dropdown" className="hidden absolute top-[15px] right-auto left-auto z-[10000] mt-2 w-48 origin-top-right rounded-md bg-white text-black py-1 shadow-lg">
                        <ul>
                          { selectableTeamMembers }
                        </ul>
                      </div>
                    </span>
                  }
                </div>
                <div>
                  Points
                  <input
                    value={pointsInput}
                    onChange={(e) => setPointsInput(e.target.value)}
                    className="mr-auto ml-auto rounded-sm border-gray-300 border solid w-[30px]"
                    type="number"
                    min="0"
                    max="9"
                    name="points"
                    id="points"
                    placeholder="0" />
                </div>
              </div>
            </div>
            <div className="flex self-center">
              <button onClick={ submitForm } className="w-[500px] bg-blue-500 rounded-sm">
                Create
              </button>
            </div>
            <div className="text-red-500 text-center">{ errorMessage }</div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewUserStory