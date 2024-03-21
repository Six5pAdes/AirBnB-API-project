import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const disabledButton = email === '' || username === '' || firstName === '' || lastName === '' || password === '' || confirmPassword === '' || username.length < 4 || password.length < 6
  // const invalidInfo = () => {
  //   return (
  //     !email.length ||
  //     username.length < 4 ||
  //     !firstName ||
  //     !lastName ||
  //     password.length < 6 ||
  //     !confirmPassword
  //   );
  // };

  return (
    <div className="signupModalWrapper">
      <h1>Sign Up</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>
          <input
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.email}
          </p>
        )}
        <label>
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.username}
          </p>
        )}
        <label>
          <input
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.firstName}
          </p>
        )}
        <label>
          <input
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.lastName}
          </p>
        )}
        <label>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.password}
          </p>
        )}
        <label>
          <input
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.confirmPassword}
          </p>
        )}
        {/* {disabledButton() ? */}
        {/* <button className="disabledSignupButton" disabled={true} type="submit">Sign Up</button> */}
        {/* : */}
        <button className="signupModalButton" disabled={disabledButton} type="submit">Sign Up</button>
        {/* } */}
      </form>
    </div>
  );
}

export default SignupFormModal;
