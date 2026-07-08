import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import TextInput from "./Textinput";
import "./TextInput.css";

const TextInputBase = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="container">
      <p className="title">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <TextInput
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<MdOutlineMail size={24} />}
      />
    </div>
  );
};

export default TextInputBase;