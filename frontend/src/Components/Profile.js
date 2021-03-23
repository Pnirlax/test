import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout.js'
import axios from 'axios'
import {isAuth, getCookie, logout, updateUser} from './Helpers'
import {Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import update from '../images/update1.gif'
import update1 from '../images/col3.jpg'
import 'react-toastify/dist/ReactToastify.min.css';
import '../style.css'


const Profile= ({history}) =>{
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        buttonText: 'Update'

    });

    const token = getCookie('token')
    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () =>{
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization : `Bearer ${token}`
            },
           
        })
        .then(response =>{
            console.log('Profile update' , response)
            const {firstname, lastname, email, password} = response.data
            setValues({...values, firstname, lastname, email})

        })
        .catch (error =>{
            console.log('Profile update error', error.response.data.error)
            if(error.response.status === 401) {
                logout(() =>{
                    history.pushState('/signin');
                })
            }
        })
    }

    const {firstname, lastname, email, password, buttonText} = values;

    const handleChange=firstname => event=>{
               setValues({...values, [firstname]: event.target.value});
        
                };
            

            
   const handleSubmit=event=>{
        event.preventDefault()
        setValues({...values, buttonText:'Updating'});
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization : `Bearer ${token}`
            },
            data: {firstname, lastname, password}
        })
             .then(response =>{
           console.log('Profile updated successfully!', response)
           updateUser(response,()=>{
                setValues({...values, buttonText: 'Updated'});
            toast.success('Profile updated successfully!')
           });        
       })
       .catch(error => {
        console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
        setValues({ ...values, buttonText: 'Update' });
        toast.error(error.response.data.error);
    });
        
    }

    return (
        <div className='home' style={{ backgroundImage: `url(${update})`}} >
        <Layout>
                <br/>
                 <div id ='signup' style={{backgroundImage: `url(${update1})`}} className='col-md-6 offset-md-3 block-example border border-gray' >
                     <ToastContainer/>
                     
                 <h1 className="p-5 text-center">Profile update</h1>
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
                    <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled />
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
export default Profile;