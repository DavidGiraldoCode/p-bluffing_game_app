import TestUI from "./components/TestUI";
export default
    function App(props) {
    console.log('Update App!')
    //! Tesing <TestUI model={props.model} />
    return (
        <div>
            <TestUI model={props.model} />
        </div>
    );
}