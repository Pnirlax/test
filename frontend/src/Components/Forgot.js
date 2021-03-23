import React, {useState} from 'react'
import Layout from '../core/Layout.js'
import axios from 'axios'
import {Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import forgot1 from '../images/col5.jpg'
import forgot from '../images/forgot.gif'
import '../style.css'
import denv from 'dotenv';



const dotenv = denv.config();
toast.configure();

const Forgot= (history) =>{
    const [values, setValues] = useState({
        email: '',
        
        buttonText: 'Request reset password link'

    });

    const { email, buttonText} = values;

    const handleChange=firstname => event=>{
               setValues({...values, [firstname]: event.target.value});
        
                };

    const handleSubmit=event=>{
        event.preventDefault();
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: {email}
        })
       .then(response =>{
           console.log('FORGOT PASSWORD SUCCESS', response);
           //save response (user infomation, token) which is save in localstorage and cookie respectively
           toast.success(response.data.message)
           setValues({...values, buttonText: 'Requested'})
       })
       .catch (error => {
          console.log('FORGOT PASSWORD ERROR', error.response.data)
           toast.error(error.response.data.error);
           setValues({...values, buttonText: 'Request reset password link'})
           
       })
        
    }
    
   
        return (
            <div className ='home' style={{backgroundImage: `url(${forgot})`}}>
                <Layout>
                    
                    <br/>
                <div  style={{backgroundImage: `url(${forgot1})`}} className='col-md-6 offset-md-3 block-example border border-purple' >
                    <ToastContainer/>
                  
                <h1 className="p-5 text-center">Forgot Password</h1>
                <Form >

                    <FormGroup>
                        <Label for='email' Block>Email</Label>
                        <Input type='text' name='email' id='email'
                         value={email} onChange={handleChange('email')}/>
                    </FormGroup>

                    <Button className="activatebtn" Block 
                    onClick={handleSubmit}>{buttonText}</Button>

                </Form>
                <br/>
            </div>
            
                </Layout>
            </div>
        )
}


export default Forgot;