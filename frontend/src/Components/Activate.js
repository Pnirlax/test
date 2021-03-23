import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout.js'
import axios from 'axios'
import jwt from 'jsonwebtoken';
import { Button } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import activate from '../images/signup.jpg'
import activate1 from '../images/col3.jpg'
import 'react-toastify/dist/ReactToastify.min.css';
import '../style.css'


import  { Component } from 'react'
//const dotenv = denv.config();
toast.configure();
const Activate= ({match}) =>{
    const [values, setValues] = useState({
        firstname: '',
        token: '',
        show: true
        

    });
    useEffect(()=> {
       let token = match.params.token;
       let { firstname } = jwt.decode(token);
        // console.log(token);
        if (token) {
            setValues({ ...values, firstname, token });
        }
    }, []);
  
   const {firstname, token, show} = values;

  const  clickSubmit=event=>{      
    event.preventDefault();
  
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/account-activation`,
        data: {token}
    })
  

   .then(response =>{
       console.log('ACCOUNT ACTIVATION', response)
       setValues({...values, show: false});
       toast.success(response.data.message);
   })
   .catch (error => {
       console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error)
       toast.error(error.response.data.error);
   });
};

        const activationLink= () =>(
            <div className="text-center ">
                <h1 className="p-5">Hey {firstname}, MyNote app account is ready to activate. Click below to start.</h1>
                <Button className="activatebtn" onClick={clickSubmit}>Activate Account</Button>
            </div>      
    )
    
        return (
            <div className='home' style={{backgroundImage: `url(${activate})`}}>
            <Layout>
                <br/>
            <div id ='activate' style={{backgroundImage: `url(${activate1})`}} className="col-md-6 offset-md-3 block-example border border-green">
                <ToastContainer />
                {activationLink()}
                <br/>
            </div>
            
        </Layout>
        </div>
           
        );
    };
export default Activate;

