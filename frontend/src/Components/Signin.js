import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout.js'
import axios from 'axios'
import {Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import signin from '../images/col.jpg'
import signgif from '../images/signin.gif'
import 'react-toastify/dist/ReactToastify.min.css';
import '../style.css'
import denv from 'dotenv';

import  { Component } from 'react'
import { authenticate, isAuth } from './Helpers.js'
const dotenv = denv.config();
toast.configure();

const Signin= (history) =>{
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Login'
    });

    const { email, password, buttonText} = values;

    const handleChange=(firstname) => (event)=>{
               setValues({...values, [firstname]: event.target.value});
        
                };

    const handleSubmit=(event)=>{
        event.preventDefault()
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
      

       .then(response =>{
           console.log('SIGNIN SUCCESS', response)
           //save response (user infomation, token) which is save in localstorage and cookie respectively
           authenticate(response, () => {
               console.log(response.data);
            setValues({...values, email:'', password:'',buttonText: 'Submitted'});
            localStorage.setItem("token", response.data.token);
        //    toast.success(`Hey ${response.data.user.firstname}, Welcome back!`);

           })
       })
       .catch (error => {
           console.log('SIGNIN ERROr', error.response.data)
           setValues({...values, buttonText: 'Login'})
           toast.error(error.response.data.error);
       })
        
    }
   // if(isAuth()==true)return <Redirect to="/Private.js" />;
   
        return (
            <div>
                <div className='home' style={{backgroundImage: `url(${signgif})`}}>
                <Layout>
                    <br/>
                <div id ='back' style={{backgroundImage: `url(${signin})`}} className='col-md-6 offset-md-3 block-example border border-purple' >
                    <ToastContainer/>
                   {isAuth() ? <Redirect to= "/Private"/>: null}
                   
                <h1 className="p-5 text-center">Signin Form</h1>
                <Form>

                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input type='text' name='email' id='email'
                         value={email} onChange={handleChange('email')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password' 
                        value={password} onChange={handleChange('password')}/>
                    </FormGroup>

                    <Button className="activatebtn" Block 
                    onClick={handleSubmit}>{buttonText}</Button>


                </Form>
                <br/>
                <Link to="auth/password/forgot"  className= "forgotpass"> Forgot Password</Link>
                <br/><br/>
            </div>
                </Layout>
            </div>
            </div>
        )
}


export default Signin;