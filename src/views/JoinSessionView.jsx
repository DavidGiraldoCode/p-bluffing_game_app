
import JoinHeader from "../components/JoinHeader.jsx";
import JoinSessionForm from "../components/JoinSessionForm.jsx";
import CreateSession from "../components/CreateSession.jsx";
import Footer from "../components/Footer.jsx";

export default
function JoinSessionView(props) {
  return (
  <div>
    <div>
      {<JoinHeader />}
      {<JoinSessionForm />}
      {<CreateSession />}
      {<Footer />}
    </div>
  </div>
  );
}

