import React, {useEffect, useState, Component} from 'react';
import '../style.css';
import { render } from '@testing-library/react';
import SidebarComponent from './sidebar';
import UserHomeComponent from '../Components/User_Home';
import axios from 'axios'
import { isAuth} from '../Components/Helpers';
import {ToastContainer, toast} from 'react-toastify'
import SideNav from './SideNav'

export default class Private extends Component{
    constructor(){
        super()
        this.state={
            selectedNoteIndex: -1,
            selectedNote: null,
            notes: null,
            config: {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            }
        }
    }
    componentDidMount(){
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/mynote`,
            headers: this.state.config.headers           
        })
            .then((res) => {
                console.log(res);
                this.setState({ notes: res.data })
            }).catch((err) => console.log(err));
      }

      selectNote=(note, index) => {
        this.setState({selectedNote:note, selectedNoteIndex:index});
      }
    //   noteUpdate=(_id,noteObj)=>{
    //       console.log(_id,noteObj);

    //   }

      noteUpdateHandler = (type, value) => {
          let {selectedNote} = this.state;
          selectedNote[type] = value;
        //   this.setState({[type] : value});
          this.setState({selectedNote});
      }

      setTitle = (title) => {
            this.setState({title});
      }

      newNote=() =>{
        // const note= {
        //     title:title,
        //     body:'',
        //     image:''
        // }
        axios.post(`${process.env.REACT_APP_API}/note`, {title:this.state.title, body:'', image: ''},
                this.state.config)
                .then((res) => {
                    this.setState({
                        notes: [...this.state.notes, res.data],
                        title: '', body:'', image:''
                    })
               }).catch(err => {
                   if(err.response && err.response.data.message){
                   console.log(err.response.data.message);
                   }else{
                    console.log(err.message);
                   }
               });
    }
    noteUpdate=() =>{
        console.log("update called", this.state.selectedNote);
        axios.put(`${process.env.REACT_APP_API}/mynote/${this.state.selectedNote._id}`,
                this.state.selectedNote, this.state.config)
                .then((res) => {
                    console.log(res)
                    const updatedNotes = this.state.notes.map((notes) => {
                        if (notes._id === this.state.noteId) 
                        {  notes.title = this.state.title
                            notes.body = this.state.body
                            notes.image =this.state.image
                            notes.category= this.state.category;
                        }
                        return notes;
                    })
                    this.setState({
                        
                        notes: updatedNotes,
                        title: '',
                        body:'',
                        image:'',
                        category:''
                    })
                }).catch(err => console.log(err.response));
    }


      deleteNote = (note) => {
        axios.delete(`${process.env.REACT_APP_API}/mynote/${note}`, this.state.config)
            .then((response) => {
                const filteredNotes = this.state.notes.filter((note) => {
                    return note.id !== note
                })
                this.setState({
                    // visible1: true,
                    note: filteredNotes
                })
            }).catch((err) => console.log(err.response));

     
   
            // axios.delete(`${process.env.REACT_APP_API}/mynote/${noteId}`, this.state.config)
            //     .then((res) => {
            //         const filteredNotes= this.state.notes.filter((note) =>{
            //             return note._id!==noteId
            //         })
            //         this.setState({
            //             notes: filteredNotes
                       
            //         })
            //     }).catch((err) => console.log(err.res));
        
    }
    
    

    

    render(){
        if(!this.state.notes)
        return "";
        return(
            <div className="app-container">
                 <SideNav>

                 </SideNav>
                <SidebarComponent  selectedNoteIndex={this.state.selectedNoteIndex}
                    notes ={this.state.notes} 
                    deleteNote={this.deleteNote}
                    selectNote={this.selectNote}
                    newNote={this.newNote}
                    setTitle= {this.setTitle}
                    ></SidebarComponent>
                {/* <UserHomeComponent
                        selectedNote={this.state.selectedNote}
                        selectedNoteIndex={this.state.selectedNoteIndex}
                        notes={this.state.notes}
                        ></UserHomeComponent> */}
                 {
                     this.state.selectedNote ?
                     <UserHomeComponent
                        noteUpdateHandler ={ this.noteUpdateHandler}
                        selectedNote={this.state.selectedNote}
                        selectedNoteIndex={this.state.selectedNoteIndex}
                        notes={this.state.notes}
                         noteUpdate={this.noteUpdate}
                        ></UserHomeComponent> :
                        null
                        }  
                        
                    </div>
                        )
                    
                        }
                }

