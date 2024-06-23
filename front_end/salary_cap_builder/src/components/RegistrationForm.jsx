import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../utilities";

const RegistrationForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    let response = await api.post("users/signup/", {
      email: email,
      password: password,
      username: username,
    });
    if (response.status === 201) {
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
      navigate('/dashboard')
    } else {
      alert("Something Went Wrong!");
    }
  };

  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/login/");
  };
  return (
    <>
      <div className="RegistrationForm">
        <Form onSubmit={(e) => signUp(e)}>
          <Form.Group className="mb-4">
            <Form.Label className="label">Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="label">Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className="login-submit-button"
            variant="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      </div>
      <br></br>
      <h2 className="registration-member">Already a member?</h2>
      <br></br>
      <div className="registration-member">
        <Button onClick={handleClick}>Login</Button>
      </div>
    </>
  );
};

export default RegistrationForm;
