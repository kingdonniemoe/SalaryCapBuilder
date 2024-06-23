import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../utilities";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

function LoginForm() {
  const { setUser } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const logIn = async (e) => {
    e.preventDefault();
    let response = await api.post("users/login/", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      console.log(response.data)
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
      navigate('/dashboard/')
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className="LoginForm">
      <Form onSubmit={logIn}>
        <Form.Group className="mb-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="login-submit-button" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
