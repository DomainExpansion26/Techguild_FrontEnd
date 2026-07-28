import "./SignupCard.css";

const SignupCard = ({ children, className }) => {
  return <div className={`signup-card ${className || ""}`}>{children}</div>;
};

export default SignupCard;
