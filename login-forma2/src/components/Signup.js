import axios from "axios";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [singupData, setSignupData] = useState({});
  //   //   const { signup } = useAuth();
  //   const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cfrToken, setCfrToken] = useState("");
  const history = useHistory();

  //   async function handleSubmit(e) {
  //     e.preventDefault();

  //     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //       return setError("Passwords do not match");
  //     }
  //     try {
  //       setError("");
  //       setLoading(true);
  //       await signup(emailRef.current.value, passwordRef.current.value);
  //       history.push("/");
  //     } catch {
  //       setError("Failed to create an account");
  //     }

  //     setLoading(false);
  //   }
  const [error, setError] = useState("");
  //   const [signupData, setSignupData] = useState({});

  async function handleSubmit(e, key) {
    debugger;
    e.preventDefault();
    setLoading(true);
    // const headers = {
    //   // 'Authorization' => 'Bearer '.$accessToken,
    //   // "Access-Control-Allow-Headers": "*",
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // };
    // let token = document.head.querySelector('meta[name="csrf-token"]');

    // if (token) {
    //   axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
    // } else {
    //   console.error(
    //     "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    //   );
    // }

    axios
      .post(
        "http://127.0.0.1:8000/api/user-signup",
        {
          name: "Korisnik",
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
        // { headers }
      )
      .then((response) => {
        // console.log("Success");
        // setCfrToken(response.data.csrf_token);
        setLoading(false);
        if (response.data.status === 200) {
          setSignupData({
            emailRef: "",
            passwordRef: "",
            passwordConfirmRef: "",
          });
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
