import heroImg from "./assets/hero.png";
import PrimaryButton from "../../Techguild_FrontEnd/src/Components/Button/Primarybutton";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="left">
        <h1>Welcome to React</h1>
        <p>
          Build modern and responsive web applications using React and reusable
          components.
        </p>

        <PrimaryButton
          text="Get Started"
          onClick={() => alert("Welcome!")}
        />
      </div>

      <div className="right">
        <img src={heroImg} alt="Hero" />
      </div>
    </div>
  );
}

export default App;