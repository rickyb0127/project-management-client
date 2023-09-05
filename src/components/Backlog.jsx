import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SideMenu from './SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewUserStory from './NewUserStory';

function Backlog(props) {
  const { state } = useLocation();
  // TODO add third check to fetch project if not sent
  const [project, setProject] = useState(state.project || props.project);
  const [userStories, setUserStories] = useState(null);
  const [showAddUserStoryModal, setShowAddUserStoryModal] = useState(false);

  useEffect(() => {
    (async function() {
      const projectStories = await fetchUserStories();

      if(projectStories) {
        setUserStories(projectStories);
      }
    })();
  }, [project]);

  const onUserStoriesChanged = (userStory) => {
    setShowAddUserStoryModal(false)
  };

  const fetchUserStories = async () => {
    try {
      const token = sessionStorage.getItem('project-management.token');

      const response = await fetch(
        `http://localhost:4000/api/v1/user-stories/${project._id}`, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          method: "GET"
        }
      );

      const responseJSON = await response.json();
      const userStories = responseJSON.userStories;

      if(response.status === 200) {
        return userStories;
      } else {
        setErrorMessage(responseJSON.error);
      }

      return;
    } catch(err) {
      // this returns unhandled server errors
      console.log(err)
    }
  };

  const userStoriesElement = userStories ? userStories.map((story) => {
    return (
      <div key={story._id} className="flex justify-between h-[60px] bg-slate-300 m-[10px] p-[10px] items-center">
        <div className="flex">
          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
          <FontAwesomeIcon className="ml-[5px]" icon="fa-regular fa-square" />
        </div>
        <div className="flex">{ story.title }</div>
        <div className="flex">{ story.status }</div>
        <div className="flex">{ story.points }</div>
        <div className="flex"><FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" /></div>
      </div>
    )
  }) : <div></div>

  return (
    <>
      <div className="flex">
        <SideMenu project={ project } />
        <div className="flex px-[20px] py-2 w-[calc(100vw-180px)] h-[60px] flex-col">
          <div className="flex justify-between mb-4">
            <h1 className="flex text-xl">Backlog</h1>
            <button onClick={ () => {setShowAddUserStoryModal(true)} } className="flex bg-cyan-500 rounded-sm w-[120px] h-[50px] text-white justify-center items-center">
              <FontAwesomeIcon className="pr-[10px]" icon="fa-solid fa-plus" />User Story
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex"></div>
              <div className="flex">User Story</div>
              <div className="flex">Status</div>
              <div className="flex">Points</div>
              <div className="flex"></div>
            </div>
            <div className="flex flex-col">
              { userStoriesElement }
            </div>
          </div>
        </div>
        { showAddUserStoryModal ? 
          <div className="z-[99999] absolute top-0 h-full w-full bg-white opacity-95">
            <div className="absolute right-[25px] top-[25px]">
              <button onClick={ () => {setShowAddUserStoryModal(false)} }><FontAwesomeIcon className="pr-[10px] text-[28px]" icon="fa-solid fa-xmark" /></button>
            </div>
            <div className="w-[50%] h-full ml-auto mr-auto">
              <NewUserStory project={ project } onUserStoriesChanged={onUserStoriesChanged} />
            </div>
          </div> 
          : <></> 
        }
      </div>
    </>
  )
}

export default Backlog