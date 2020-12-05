import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container, 
  Jumbotron, 
  Form, 
  FormGroup, 
  Label,
  Input,
  Button, 
  Alert
} from 'reactstrap';


function Home() {
    const [budget, setBudget] = useState({
        name:'',
        email:'',
        phone:'',
        whatsApp:'',
        msg:''
    });

    const [response, setResponse] = useState({
        formSave: false,
        type:'',
        message:''
    });

    const onChangeInput = e => setBudget({...budget, [e.target.name]: e.target.value});

    const sendRequest = async e => {
        e.preventDefault();
        setResponse({formSave: true});

        try{
            const res = await fetch('http://localhost:8080/budget', {
                method: 'POST',
                body: JSON.stringify(budget),
                headers: {'Content-Type': 'application/json'}
            });

            const responseEnv = await res.json();

            if(responseEnv.error){
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.message
                });
            }else{
                setResponse({
                    formSave: false,
                    type:'success',
                    message: responseEnv.message
                });
            }         

        }catch(err){
            setResponse({
                formSave: false,
                type: 'error',
                message: 'Bad request! Sorry. Please, try again later.'
            });
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
    <div>
         <Navbar color="warning" light expand="md">
             <Container>
                <NavbarBrand href="/">PetWow</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                    <NavLink href="/">Get a quote!</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
             </Container>
        </Navbar>
        <Jumbotron className="pg-budget">
            <style>
                {`.pg-budget{
                    background-color:#f1ffc4;
                    color: #EF8A17;
                    padding-top:50px;
                    padding-bottom: 100px;
                    margin-bottom: 0rem !important;
                }`}
            </style>
            <Container>
            <h1 className="display-4 text-center">Our team is ready to help!</h1>
            <p className="lead text-center mb-4">Leave your contact info below and we will get in touch.</p>
            
            {response.type === 'error' ?  <Alert color="danger">{response.message}</Alert> : " "}
            {response.type === 'success' ?  <Alert color="success">{response.message}</Alert> : " "}

            <Form onSubmit={sendRequest}>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Full name" onChange={onChangeInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="example@mail.com" onChange={onChangeInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type="text" name="phone" id="phone" placeholder="xx xxxx-xxxx" onChange={onChangeInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="whatsApp">WhatsApp</Label>
                <Input type="text" name="whatsApp" id="whatsApp" placeholder="xx xxxx-xxxx" onChange={onChangeInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="msg">Your Pet</Label>
                <Input type="textarea" name="msg" id="msg" placeholder="Please, describe your pet and the services you need. Give as much details as possible." onChange={onChangeInput}/>
            </FormGroup>

            {response.formSave ? <Button type="submit" outline color="warning" disabled>Sending...</Button> : <Button type="submit" outline color="warning">Send</Button>}
            
            </Form>
            </Container>
        </Jumbotron>

        <Jumbotron fluid className="footer bg-warning">
            <style>
                {`.footer{
                    color: #fff;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    margin-bottom: 0rem !important;
                }`}
            </style>
            <Container>
                <h1 className="lead text-center">PetWow - The best place for your pet-friend!</h1>
            </Container>

        </Jumbotron>
    </div>
    )
  }
  
  export default Home