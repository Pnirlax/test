import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Divider } from '@material-ui/core';
import { FaClipboardList,FaTags,FaUserCog,FaSignOutAlt, FaTrash } from "react-icons/fa";
import user from '../images/user.png'
import { isAuth,logout} from '../Components/Helpers';
import { AddCategory } from '../Components/AddCategory.js';
import {EditProfile } from '../Components/EditProfile.js';


class SideNav extends React.Component{
    constructor(props){
        super(props);

        console.log(props.notes);
        this.state ={
            addModalShow:false,
            addModalShow2:false
        }
        this.sidebaritemRef =React.createRef()
    }
    handlefocus=(event) =>{
        this.sidebaritemRef.current.focus()
    }
    render( ){
        let addModalClose =()=> this.setState({addModalShow:false});
        let addModalClose2 =()=> this.setState({addModalShow2:false});
            return(
                <div className="sidenav">
                    <span>
                   <img id="usericon" src={user} alt="user avatar"/>
                   </span>
                   {isAuth() && (
                
                
                <span
                    className="text-light nav-link" id="first">
                    {isAuth().firstname}
                </span>     
            
             )}
                  {isAuth() && (
                
                
                <span
                    className="text-light nav-link" id="last">
                    {isAuth().lastname}
                </span>     
            
        )}
                    
                    <Divider></Divider>
                    
                      <a href="#" > <FaClipboardList size='1.5rem' color='#9be882'/> All Note</a>
                      
                      <a href="#" onClick={() =>this.setState({addModalShow:true})} ><FaTags size='1.5rem' color='#9be882'/>  Category</a>
                      <AddCategory
                      show={this.state.addModalShow} 
                      onHide={addModalClose}
                      />
                      <a href="#" onClick={() =>this.setState({addModalShow2:true})} ><FaTags size='1.5rem' color='#9be882'/>  Profile</a>
                      <EditProfile
                      show={this.state.addModalShow2} 
                      onHide={addModalClose2}
                      />
                      {/* <a href="#"><FaUserCog size='1.5rem' color='#9be882'/> Profile</a> */}
                      <a href="/signin" onClick={logout}><FaSignOutAlt size='1.5rem' color='#9be882'/> Logout</a>
                   </div> 
            )    
        
    }
}
export default withStyles(styles)(SideNav);