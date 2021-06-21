import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

//use history koristimo onda da kad se ulogujemo da nam se otvori  druga strana

function Login(props) {
  const { login, setLogin } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  //   const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/api/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((response) => {
        setLoading(false);
        const jwt_token = response.data;
        login(jwt_token);
        console.log(jwt_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  document.body.style.background = "#fff";

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </>
  );
}

export default Login;
