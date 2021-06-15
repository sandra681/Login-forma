import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [singupData, setSignupData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState("");

  async function handleSubmit(e, key) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "http://127.0.0.1:8000/api/auth/register",
        {
          name: "Korisnik",
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log(response.status);
        if (response.status === 201) {
          setSignupData({
            emailRef: "",
            passwordRef: "",
            passwordConfirmRef: "",
          });
          history.push("/");
        } else {
          console.log("failed");
          setTimeout(() => {
            setError("failed");
          }, 2000);
        }
      });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Form onSubmit={handleSubmit}>
            {/* <input type="hidden" name="_csrf" value={cfrToken} /> */}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default Signup;
