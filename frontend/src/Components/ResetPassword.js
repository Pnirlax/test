import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout.js'
import axios from 'axios'
import {Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import reset from '../images/pass.jpg'
import reset1 from '../images/col4.jpg'
import 'react-toastify/dist/ReactToastify.min.css';
import '../style.css'
import denv from 'dotenv';
import jwt from 'jsonwebtoken';



const dotenv = denv.config();
toast.configure();

const Reset= ({match}) =>{//props.match from react router dom

    const [values, setValues] = useState({
        email: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'

    });

    useEffect(() =>{
        let token= match.params.token;
        let {firstname} = jwt.decode(token);
        if(token){
            setValues({...values, firstname, token})
        }
    }, []);

    const { firstname, token, newPassword, buttonText} = values;

    const handleChange= event =>{
        setValues({ ...values, newPassword: event.target.value });
        
                };

    const handleSubmit=event=>{
        event.preventDefault()
        setValues({...values, buttonText:'Done'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword, resetPasswordLink: token }
        })
      

       .then(response =>{
           console.log('RESET PASSWORD SUCCESS', response)
           //save response (user infomation, token) which is save in localstorage and cookie respectively
           toast.success(response.data.message)
           setValues({...values, buttonText: 'Done'})
       })
       .catch (error => {
           console.log('RESET PASSWORD ERROR', error.response.data)
           toast.error(error.response.data.error);
           setValues({...values, buttonText: 'Reset Password'})
           
       })
        
    }
    
   
        return (
            <div  className='home' style={{backgroundImage: `url(${reset})`}}>
                <Layout>
                    <br/>
                <div id='reset' style={{backgroundImage: `url(${reset1})`}} className='col-md-6 offset-md-3 block-example border border-purple' >
                    <ToastContainer/>
                  
                <h1 className="p-5 text-center">Hello {firstname}, type your new password.</h1>
                <Form>

                    <FormGroup>
                        <Label className= "text-muted">New Password</Label>
                        <Input type='password'  placeholder= "Type new password" required
                          value={newPassword} onChange={handleChange}/>
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


export default Reset;