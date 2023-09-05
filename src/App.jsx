import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Projects from './components/Projects.jsx';
import Project from './components/Project.jsx';
import Dashboard from './components/Dashboard';
import Marketing from './components/Marketing';
import NewProject from './components/NewProject';
import Backlog from './components/Backlog';
import Epics from './components/Epics';
import Team from './components/Team';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Route, Routes, useLocation } from "react-router-dom";
import RegisterLogin from './components/RegisterLogin';

function App() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const token = sessionStorage.getItem('project-management.token');

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/projects`, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          method: "GET"
        }
      );

      const responseJSON = await response.json();

      if(response.status === 200) {
        const projects = responseJSON.userProjects;
        setProjects(projects);
      }

      return;
    } catch(err) {
      console.log(err);
    }
  };

  const checkIsAuthed = async () => {
    try {
      const token = sessionStorage.getItem('project-management.token');

      const response = await fetch(
        `http://localhost:4000/api/v1/user`, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          method: "GET"
        }
      );

      const responseJSON = await response.json();

      if(response.status === 200) {
        const user = responseJSON.user;

        setLoggedInUser(user);
        fetchProjects();
      }

      return;
    } catch(err) {
      console.log(err)
    }
  };

  // TODO this might not be needed
  // useEffect(() => {
  //   checkIsAuthed();
  // }, []);

  useEffect(() => {
    checkIsAuthed();
  }, [location]);

  const signOut = () => {
    sessionStorage.removeItem('project-management.token');
    setLoggedInUser(null);
  };

  return (
    <>
      <NavBar
        projects={ projects } 
        loggedInUser={ loggedInUser } 
        signOut={ signOut } 
      />
      {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={ loggedInUser ? <Dashboard /> : <Marketing /> } />
          <Route path="/login" element={<RegisterLogin isRegistered={ true } />} />
          <Route path="/register" element={<RegisterLogin isRegistered={ false } />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/new" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/:id/epics" element={<Epics />} />
          <Route path="/project/:id/backlog" element={<Backlog />} />
          <Route path="/project/:id/team" element={<Team />} />
        </Routes>
      {/* </div> */}
    </>
  )
}

export default App
library.add(fab, fas, far)