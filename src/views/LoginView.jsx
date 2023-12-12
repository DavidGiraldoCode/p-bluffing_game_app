import CreateSession from "../components/CreateSession.jsx";

export default
function LoginView(props) {

  return (
  <div>
    <div>
      {<CreateSession clickEvent={loginHandlerACB}/>}
    </div>
  </div>
  );
}