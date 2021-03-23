import React from 'react'
import axios from 'axios'
import {isAuth, logout} from './Helpers'
import { Label } from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import update1 from '../images/col3.jpg'
import 'react-toastify/dist/ReactToastify.min.css';
import '../style.css'
import { FormGroup, Input } from '@material-ui/core';
import  {Component} from 'react'
import {Modal, Button, Form} from 'react-bootstrap';


export class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            user:{},
            config: {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            },
           
        }
    }

        componentDidMount() {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
                headers: this.state.config.headers               
               
            })
            .then(response =>{
                console.log(response.data)
                
                this.setState({
                    user:response.data
                })
    
            }).catch((err) => console.log(err.response));
    
        }

        handleChange(e) {
            this.setState({
                user: { ...this.state.user, [e.target.name]: e.target.value }
            })
        }
        updateUser = (e) => {
            e.preventDefault();
            axios({method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            data:this.state.user,
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token') 
            }})
                .then((response) => console.log('Profile updated successfully!!',response.data),
                toast.success('Profile updated successfully!!')
                )
              
                
                .catch (error =>{
                    console.log('Profile update error', error.response.data.error)
                    if(error.response.status === 401) {
                        logout(() =>{
                            this.props.history.push('/Signin');
                        })
                    }
                })
        }   
            render(){

                if (this.state.user === {}) {
                    return <h3>Loading ...</h3>

                } else {
                return(
                    <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton id='head'>
                <Modal.Title id="contained-modal-title-vcenter" >
                Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
 
                 <div id ='' style={{backgroundImage: `url(${update1})`}} className='editprofile' >
                     <ToastContainer/>
                     
                 <h1 className="p-5 text-center">Profile update</h1>
               <Form className ="col-md-6 offset-md-3">
                   <FormGroup>
                       <Label for= 'firstname'>First Name</Label>
                       <Input type ='text' name='firstname' id= 'firstname' 
                        value={this.state.user.firstname} onChange={(e) => this.handleChange(e)}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='lastname'>Last Name</Label>
                        <Input type='text' name='lastname' id='lastname' 
                        value={this.state.user.lastname} onChange={(e) => this.handleChange(e)}/>

                    </FormGroup>

                    <FormGroup>
                    <label className="text-muted">Email</label>
                <input defaultValue={this.state.user.email} type="email" className="form-control" disabled />
                    </FormGroup>

                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password' 
                         onChange={(e) => this.handleChange(e)} value={this.state.user.password}/>
                    </FormGroup>
                        <br/>
                    <Button className="activatebtn text-center" Block 
                    onClick={this.updateUser}>Update User</Button>

                </Form>
                <br/><br/>
           </div> 
      </Modal.Body>
    
    </Modal>
        )
    }
}


}