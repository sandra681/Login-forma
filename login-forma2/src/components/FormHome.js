import React, { useRef, useState } from "react";
import { Card, Form, Button, FormGroup, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormHome.css";
import axios from "axios";
import { useSelector } from "react-redux";

function FormHome({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const token = JSON.parse(localStorage.getItem("token"));
  const user = useSelector((state) => state.userReducer);
  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const priceRef = useRef();
  const infoRef = useRef();
  const categoryRef = useRef();
  const squareFootageRef = useRef();
  const roomsRef = useRef();
  const parkingRef = useRef();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  let path;

  function fileSelectedHandler(e) {
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      setFile(event.target.result);
    };
    reader.readAsDataURL(files);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    return isAddMode ? createApartment(e) : updateApartment(e);
  }
  async function createApartment(e) {
    const formData = { file };
    await axios
      .post(
        "http://127.0.0.1:8000/api/auth/fileupload",
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        path = response.data.img.id;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios

      .post(
        "http://127.0.0.1:8000/api/auth/home",
        {
          name: nameRef.current.value,
          street: streetRef.current.value,
          price: priceRef.current.value,
          info: infoRef.current.value,
          category: categoryRef.current.value,
          city: cityRef.current.value,
          square_footage: squareFootageRef.current.value,
          rooms_number: roomsRef.current.value,
          parking_spaces: parkingRef.current.value,
          image: path,
          user_id: user.user.id,
        },
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      .then((response) => {
        setLoading(false);
        setFile({ file: "" });
        if (response.data.status === 200) {
          console.log("OK");
        }
        if (response.data.status === "failed") {
          setTimeout(() => {}, 2000);
        }
      })
      .catch((error) => {
        console.log("GRESKA");
        console.log(error.message);
      });
  }

  async function updateApartment(e) {}

  return (
    <>
      <div className="wrap">
        <div className="container forma">
          <div className="img-home">
            <img
              src="https://t4.ftcdn.net/jpg/01/35/38/75/360_F_135387578_vKyGn4NM9E2ipUS9j1GRCDLs40CwRNyC.jpg"
              alt=""
            />
          </div>
          <Card.Body>
            <h2 className="text-center mb-4">
              {isAddMode ? "Add New Home" : "Edit home"}
            </h2>
            <Form className="form1" onSubmit={handleSubmit}>
              <FormGroup>
                {/*  <Form.Label >Name:</Form.Label> */}
                <Form.Control
                  ref={nameRef}
                  type="textarea"
                  required
                  placeholder="Home's Name"
                ></Form.Control>
              </FormGroup>
              <br />
              <Row className="md-2">
                <FormGroup as={Col}>
                  {/*  <Form.Label >Street:</Form.Label> */}
                  <Form.Control
                    ref={streetRef}
                    type="textarea"
                    required
                    placeholder="Street"
                  ></Form.Control>
                </FormGroup>
                <br />
                <FormGroup as={Col}>
                  {/*  <Form.Label >City:</Form.Label> */}
                  <Form.Control
                    ref={cityRef}
                    type="textarea"
                    required
                    placeholder="City"
                  ></Form.Control>
                </FormGroup>
              </Row>
              <br />

              <Row className="md-2">
                <FormGroup as={Col}>
                  {/*  <Form.Label >Price:</Form.Label> */}
                  <Form.Control
                    ref={priceRef}
                    className="price-number"
                    type="number"
                    min="0"
                    required
                    placeholder="Price"
                  ></Form.Control>
                </FormGroup>
                <br />
                <FormGroup as={Col}>
                  <Form.Control
                    ref={categoryRef}
                    as="select"
                    defaultValue=""
                    required
                  >
                    <option value="">--Choose Category--</option>
                    <option>Rent</option>
                    <option>Sell</option>
                  </Form.Control>
                </FormGroup>
              </Row>
              <br />
              <Row className="md-3">
                <FormGroup as={Col}>
                  <Form.Control
                    ref={squareFootageRef}
                    className="price-number"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    placeholder="Square Footage"
                  ></Form.Control>
                </FormGroup>
                <br />
                <FormGroup as={Col}>
                  <Form.Control
                    ref={roomsRef}
                    className="price-number"
                    type="number"
                    min="0"
                    required
                    placeholder="Number of Rooms"
                  ></Form.Control>
                </FormGroup>
                <br />
                <FormGroup as={Col}>
                  <Form.Control
                    ref={parkingRef}
                    className="price-number"
                    type="number"
                    min="0"
                    required
                    placeholder="Parking Spaces"
                  ></Form.Control>
                </FormGroup>
              </Row>
              <br />
              <FormGroup>
                {/*  <Form.Label >Information:</Form.Label> */}
                <Form.Control
                  ref={infoRef}
                  as="textarea"
                  rows={4}
                  required
                  placeholder="About home"
                ></Form.Control>
              </FormGroup>
              <br />
              <FormGroup>
                <Form.Label>Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={fileSelectedHandler}
                ></Form.Control>
              </FormGroup>
              <br />

              <div className="dugme">
                <Button disabled={loading} type="submit">
                  {isAddMode ? "Add" : "Edit"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </div>
    </>
  );
}

export default FormHome;
