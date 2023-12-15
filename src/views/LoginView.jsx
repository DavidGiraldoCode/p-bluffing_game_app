import SingleAction from "../components/SingleAction.jsx";
import Footer from "../components/Footer.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default
function LoginView(props) {
    function loginACB(){
        props.onLogin();
    }
  return (
    <div>
    <SectionTitle title="King's Bluffer" />
    <SingleAction
        title=""
        description="Login With Google"
        buttonState={false}
        btnLabel="Login!"
        onCustomClick={loginACB} />
    <Footer />
    </div>
  );
}