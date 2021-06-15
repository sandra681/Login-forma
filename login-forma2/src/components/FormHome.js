import React, { useEffect, useRef, useState } from 'react'
import {Card, Form, Button, FormGroup, Row, Col} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import './FormHome.css'
import axios from 'axios'


function FormHome() {
  
    const nameRef=useRef()
    const addressRef=useRef()
    const priceRef=useRef()
    const infoRef=useRef()
    const categoryRef=useRef()

    const [loading, setLoading]=useState(false)
    const [error, setError]=useState("")


    function handleSubmit(e){
        e.preventDefault()
        axios
        .post("",{
            name: nameRef.current.value,
            address: addressRef.current.value,
            price: priceRef.current.value,
            information: infoRef.current.value,
            category: categoryRef.current.value
        })
        .then((response)=>{
            setLoading(false)
            if(response.data.status===200){

            }

            setTimeout(()=>{},2000);
            if(response.data.status==="failed"){
                setTimeout(() => {
                    setError("failed")
                }, 2000);
            }
        })

    }

        document.body.style.background='-webkit-linear-gradient(left, #0072ff, #00c6ff)'

    return (
        <>
        
            <Card className="container forma "> 
                <Card.Body >
                    <h2 className="text-center mb-4">Add New Home</h2>
                    <Form className="form1" onSubmit={handleSubmit}>
                        
                        <FormGroup >
                           {/*  <Form.Label >Name:</Form.Label> */}
                            <Form.Control ref={nameRef}  type="textarea" required placeholder="Home's Name"></Form.Control>
                        </FormGroup>
                        <br/>
                        <FormGroup >
                           {/*  <Form.Label >Address:</Form.Label> */}
                            <Form.Control ref={addressRef} type="textarea" required placeholder="Address"></Form.Control>
                        </FormGroup>
                      
                        <br/>
                        <Row className="md-2">
                        <FormGroup as={Col}>
                           {/*  <Form.Label >Price:</Form.Label> */}
                            <Form.Control ref={priceRef} className="price-number" type="number" min="0" required placeholder="Price"></Form.Control>
                        </FormGroup>
                        <FormGroup as={Col}>
                
                            <Form.Control ref={categoryRef} as="select"  required>
                                
                                <option selected disabled hidden ></option>
                                <option>Rent</option>
                                <option>Sell</option>
                                
                                
                            </Form.Control>

                        </FormGroup>
                        </Row>
                        <br/>
                        <FormGroup>
                           {/*  <Form.Label >Information:</Form.Label> */}
                            <Form.Control ref={infoRef} as="textarea" rows={4} required placeholder="About home"></Form.Control>
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Form.Label >Image:</Form.Label>
                            <Form.File required></Form.File>
                        </FormGroup>
                        <br/>
                        
                        
                       <div className="dugme">
                        <Button 
                        disabled={loading}
                        type="submit">Add</Button>
                        </div>
                    </Form>

                </Card.Body>
            </Card>

            

        </>
    )
}

export default FormHome
