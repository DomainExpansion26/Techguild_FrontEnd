import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import "./signup.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SocialButton,
  Divider,
  TextInput,
  PasswordInput,
  TermsCheckbox,
  PrimaryButton,
  SignupCard,
} from "../../Components";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignup = () => {
    console.log("Signup data:", {
      firstName,
      lastName,
      email,
      password,
      termsAccepted,
    });
  };

  const handleGoogleSignup = () => {
    console.log("Google signup");
  };

  const handleGithubSignup = () => {
    console.log("GitHub signup");
  };

  return (
    <div className="signup-page">
      <AuthHomeScreen />

      <SignupCard>
        <BrandLogo />

        <h2>Sign Up</h2>

        <p className="subtitle">Start your TechGuild Journey</p>

        <SocialButton text="Continue with Google" onClick={handleGoogleSignup} />

        <SocialButton text="Continue with GitHub" onClick={handleGithubSignup} />

        <Divider />

        <div className="name-row">
          <TextInput
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={<User size={18} />}
          />

          <TextInput
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            icon={<User size={18} />}
          />
        </div>

        <TextInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
        />

        <PasswordInput
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={18} />}
        />

        <TermsCheckbox
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />

        <PrimaryButton text="Join TechGuild" onClick={handleSignup} />

        <p className="login">
          Already have an account ? <a href="/"> Login</a>
        </p>
      </SignupCard>
    </div>
  );
}
