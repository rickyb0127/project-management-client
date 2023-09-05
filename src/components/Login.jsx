import RegisterLogin from './RegisterLogin';

function Login(props) {
  const isRegistered = true;
  
  return (
    <>
      <RegisterLogin isRegistered={ isRegistered } />
    </>
  )
}

export default Login