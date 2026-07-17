import "./TermsCheckbox.css";

const TermsCheckbox = ({
  checked,
  onChange,
  userAgreementLink = "/",
  privacyPolicyLink = "/",
}) => {
  return (
    <label className="terms-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="terms-checkbox-input"
      />
      <span className="terms-text">
        I agree to the TechGuild
        <a href={userAgreementLink} className="terms-link">
          {" "}
          User Agreement{" "}
        </a>
        and
        <a href={privacyPolicyLink} className="terms-link">
          {" "}
          Privacy Policy
        </a>
        .
      </span>
    </label>
  );
};

export default TermsCheckbox;
