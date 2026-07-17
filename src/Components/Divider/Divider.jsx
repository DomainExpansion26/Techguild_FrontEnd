import "./Divider.css";

const Divider = ({ text = "OR" }) => {
  return (
    <div className="divider">
      <span>{text}</span>
    </div>
  );
};

export default Divider;
