import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function RegisterLogin(props) {
  const navigate = useNavigate();
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    let formData;
    let action;

    if(props.isRegistered) {
      formData = {
        email: emailInput,
        password: passwordInput
      };

      action = "login";
    } else {
      formData = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        password: passwordInput
      };

      action = "register";
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/${action}`, 
        {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(formData)
        }
      );

      const responseJSON = await response.json();

      if(response.status === 200) {
        const token = responseJSON.user.token;
        sessionStorage.setItem('project-management.token', token.toString());

        navigate("/");
      } else {
        // TODO show this errorMessage on screen
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
      <div className="flex justify-center mt-[100px]">
        <form className="grid gap-y-4 grid-cols-1 text-center">
          {!props.isRegistered ? <>
            <input
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your firstname" />
            <input
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your lastname" />
            </> : null}
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid" 
            type="email" 
            name="email" 
            id="email"
            placeholder="Your email"
          />
          <input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[300px] border-gray-300 border solid" 
            type="password" 
            name="password" 
            id="password"
            placeholder="Enter password"
          />
          <div>
            <button onClick={ submitForm } className="w-[300px] bg-blue-500 rounded-sm">
              {!props.isRegistered ? "Register" : "Login"}
            </button>
          </div>
          <div className="text-red-500 text-center">{ errorMessage }</div>
          <div className="text-center cursor-pointer">
            {!props.isRegistered ? <a href="/login">Are you already registered? Log in</a> : <a href="/register">Not registered yet? create your free account here</a>}
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterLogin