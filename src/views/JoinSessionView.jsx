
import JoinHeader from "../src/components/JoinHeader.jsx";
import JoinSessionForm from "../src/components/JoinSessionForm.jsx";
import CreateSession from "../src/components/CreateSession.jsx";
import JoinFooter from "../src/components/JoinFooter.jsx";

export default
function JoinSessionView(props) {
  return (
  <div>
    <div>
      {<JoinHeader />}
      {<JoinSessionForm />}
      {<CreateSession />}
      {<JoinFooter />}
    </div>
  </div>
  );
}

