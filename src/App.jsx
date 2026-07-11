import { PrimaryButton, SecondaryButton, LoadingButton, TextInput } from "@/Components";
import "./App.css";
import SignUp from "@/Pages/SignUp/SignUp";

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