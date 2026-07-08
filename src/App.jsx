import PrimaryButton from "./Components/Button/Primarybutton";
import SecondaryButton from "./Components/SecondaryButton/SecondaryButton";
import "./App.css";
import LoadingButton from "./Components/LoadingButton/Loadingbutton";
import TextInput from "./Components/Textinput/Textinput";
import SignUp from "./Pages/Singup";

function App() {
  return (
    <div className="preview-wrapper">
      <div className="button-group">
       <SignUp />
      </div>
    </div>
  );
}

export default App;