import "../global-style.css";
import "./SessionShare.css";

export default
function SessionShare(props) {

    function copyHandlerACB() {
    // Copy to clipboard functionality.
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.setAttribute("value", props.sessionID);

    // Append the input element to the document
    document.body.appendChild(tempInput);

    // Focus and select the text in the input
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    // Execute the copy command
    document.execCommand("copy");

    // Remove the input element from the document
    document.body.removeChild(tempInput);
    }


    return (
        <div class="sessionShare-container">
            <div class="text-title">
                <p> Session ID: </p>
            </div>
            <div class="text-sessionID">
                <h3>{props.sessionID}</h3>
                <button class="primary-no-border" onClick={copyHandlerACB}>Copy code</button>
            </div>
        </div>
    );
}
  
