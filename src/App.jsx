import PrimaryButton from "./Components/Button/Primarybutton";
import SecondaryButton from "./Components/SecondaryButton/SecondaryButton";
import "./App.css";

function App() {
  return (
    <div className="preview-wrapper">
      <div className="button-group">
        <SecondaryButton />
        <PrimaryButton
          text="Go to Gmail Inbox"
          onClick={() => alert("Going to inbox!")}
        />
      </div>
    </div>
  );
}

export default App;