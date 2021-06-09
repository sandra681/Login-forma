import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

//use history koristimo onda da kad se ulogujemo da nam se otvori  druga strana

function Login(props) {
  const { onLoginChange } = props;
  const emailRef = useRef();
  const passwordRef = useRef();

  //   const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    // To authenticate your SPA should make request to the sanctum/csrf-cookie endpoint

    // function getMeta(metaName) {
    //   const metas = document.getElementsByTagName("meta");

    //   for (let i = 0; i < metas.length; i++) {
    //     if (metas[i].getAttribute("name") === metaName) {
    //       return metas[i].getAttribute("content");
    //     }
    //   }

    //   return "";
    // }
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then((response) => {
      axios
        .post(
          "http://localhost:8000/api/user-login",
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }
          // {
          //   headers: {
          //     "X-CSRF-Token ": csrfCookie,
          //   },
          // }
        )
        .then((response) => {
          // console.log("Success");
          setLoading(false);
          if (response.data.status === 200) {
            localStorage.setItem(
              "userToken",
              JSON.stringify(response.data.data)
            );
            history.push("/");
          }
          setTimeout(() => {}, 2000);
          if (response.data.status === "failed") {
            console.log("failed");
            setTimeout(() => {
              setError("failed");
            }, 2000);
          }
        });
    });
  }

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

            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              onClick={() => onLoginChange()}
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default Login;
