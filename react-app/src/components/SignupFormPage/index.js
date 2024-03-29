import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/boards" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(
				signUp(firstName, lastName, username, email, password)
			);
			if (data) {
				setErrors(data);
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<div className="signup-page-container">
				<div className="cozy-img">
					<img src="/signup.png" alt="sign up img" />
				</div>

				<div className="signup-form-container">
					<h1>Sign Up</h1>
					<form onSubmit={handleSubmit}>
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>

						<div className="form-row">
							<label className="form-group">
								First Name
								<input
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</label>

							<label className="form-group">
								Last Name
								<input
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</label>
						</div>

						<label>
							Email
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>

						<label>
							Username
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</label>

						<label>
							Password
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>

						<label>
							Confirm Password
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>

						<button type="submit">Sign Up</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupFormPage;
