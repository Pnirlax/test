import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout.js'
import axios from 'axios'
import {isAuth} from './Helpers'
import {Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import signup from '../images/notetaking.gif'
import signup1 from '../images/col3.jpg'
import 'react-toastify/dist/ReactToastify.min.css';
import '../style.css'
import denv from 'dotenv';
const dotenv = denv.config();
toast.configure();

const Signup= () =>{
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        buttonText: 'Submit'

    });

    const {firstname, lastname, email, password, buttonText} = values;

    const handleChange=firstname => event=>{
               setValues({...values, [firstname]: event.target.value});
        
                };      
   const handleSubmit=(event)=>{
        event.preventDefault()
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {firstname, lastname, email, password}
        })
      

       .then(response =>{
           console.log('SIGNUP SUCCESS', response)
           setValues({...values, firstname:'', lastname:'', email:'', password:''})
           toast.success(response.data.message)
       })
       .catch (error => {
           console.log('SIGNUP ERROr', error.response.data)
           setValues({...values, buttonText: 'Submit'})
           toast.error(error.response.data.error);
       })
        
    }

    return (
        <div className='home1' style={{backgroundImage: `url(${signup})`}} >
        <Layout>
                <br/>
                 <div id ='signup' style={{backgroundImage: `url(${signup1})`}} className='col-md-6 offset-md-3 block-example border border-gray' >
                     <ToastContainer/>
                     {isAuth() ? <Redirect to= "/"/>: null}
                 <h1 className="p-5 text-center">Signup Form</h1>
               <Form>
                   <FormGroup>
                       <Label for= 'firstname'>First Name</Label>
                       <Input type ='text' name='firstname' id= 'firstname' 
                        value={firstname} onChange={handleChange('firstname')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='lastname'>Last Name</Label>
                        <Input type='text' name='lastname' id='lastname' 
                        value={lastname} onChange={handleChange('lastname')}/>

                    </FormGroup>

                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input type='text' name='email' id='email'
                         value={email} onChange={handleChange('email')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password' 
                         onChange={handleChange('password') } value={password}/>
                    </FormGroup>

                    <Button className="activatebtn" Block 
                    onClick={handleSubmit}>{buttonText}</Button>

                </Form>
                <br/><br/>
            </div>
            
                </Layout>
                </div>
    )
}
export default Signup;
