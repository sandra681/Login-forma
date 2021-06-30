import React, { useRef, useState } from "react";
import { Card, Form, Button, FormGroup, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormHome.css";
<<<<<<< HEAD
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

//import { axios } from "axios";
import axios from 'axios';
=======
import axios from "axios";
>>>>>>> origin/filterBranch

function FormHome() {
  const token = JSON.parse(localStorage.getItem("token"));
  const imageRef = useRef();
  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const priceRef = useRef();
  const infoRef = useRef();
  const categoryRef = useRef();
  const squareFootageRef = useRef();
  const roomsRef = useRef();
  const parkingRef = useRef();
<<<<<<< HEAD
  const user = JSON.parse(localStorage.getItem("user"));
  const history=useHistory()
  // console.log(user.id);
=======
  // const user = JSON.parse(localStorage.getItem("user")); OVDE SE MORA VRATITI KORISNIK
>>>>>>> origin/filterBranch

  const [loading, setLoading] = useState(false);
  const [file, setFile]=useState(null)

<<<<<<< HEAD
  function fileSelectedHandler(e){
    setFile(e.target.files[0])
    
  }

=======
>>>>>>> origin/filterBranch
  async function handleSubmit(e) {
    e.preventDefault();

    const files=new FormData()
    files.append("file", file)
   
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
<<<<<<< HEAD
          //image: imageRef.current.value,

          user_id: user.id,

=======
          image: imageRef.current.value,
          // user_id: user.id,
>>>>>>> origin/filterBranch
        },
        files,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setLoading(false);
        setFile({file:''})
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
<<<<<<< HEAD
  
 
  
=======

  document.body.style.background =
    "-webkit-linear-gradient(left, #0072ff, #00c6ff)";

>>>>>>> origin/filterBranch
  return (
    <>
    
    <div className="wrap">
      
      <div className="container forma" >
        
        
        <div className="img-home">
          <img
            src="https://t4.ftcdn.net/jpg/01/35/38/75/360_F_135387578_vKyGn4NM9E2ipUS9j1GRCDLs40CwRNyC.jpg"
            
          />
        </div>
        <Card.Body>
          <h2 className="text-center mb-4">Add New Home</h2>
          <Form className="form1" onSubmit={handleSubmit} >
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
                <Form.Control ref={categoryRef} as="select" defaultValue="" required>
                  <option value=""  >--Choose Category--</option>
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
              <Form.Control type="file"  onChange={fileSelectedHandler} required></Form.Control>
            </FormGroup>
            <br />

            <div className="dugme">
              <Button disabled={loading} type="submit"  >
               
               Add
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
