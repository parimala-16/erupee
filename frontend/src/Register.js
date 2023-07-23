import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Register ()  {
  const [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    balance:''

  })

  const handleChange = (event) =>{
    setValues({...values, [event.target.name]:event.target.value});
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:4000/register',values)
    .then(res => window.alert("registered"))
    .catch(err => console.log(err))
  }



  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter email" name="name" onChange={handleChange} />
      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange}/>
      
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>e$Balance</Form.Label>
        <Form.Control type="number" placeholder="Enter amount" name='balance' onChange={handleChange}/>
      
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Register