
import "./SelectContent.css";

export default
function SelectContent(props) {
  return (
    <form className="main-container">
      <header className="title">Your turn!</header>
      <p className="description">Pick a card to bluff your way out</p>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/169021e82fafc3da5e1611a4941120418e87939b4606cae3dfa299082c903e97?apiKey=4ff87b3424964660b6678b1b8d802ec6&"className="image-wrapper"
        alt="Select Card"
      />
      <button className="confirm-button">Confirm</button>
    </form>
  );
}