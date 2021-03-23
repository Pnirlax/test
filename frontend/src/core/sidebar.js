import React , { PropTypes }from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button,Input } from '@material-ui/core';
import SidebarItemComponent from './sidebaritem/sidebarItem';
import { FaSearch,FaSortAmountDownAlt,FaFilter,FaSortAmountDown } from "react-icons/fa";
class SidebarComponent extends React.Component{
    constructor(props){
        super(props)
        // console.log(props.notes);
        this.state ={
            addingNote: false,
            title:'',
            search:'',
            notes:[],
            SortByAZ:'asc',
            sort:'',
            config: {
                headers: { 'Authorization':  localStorage.getItem('token')}
            }
        }
    }
    dynamicSort(notes) {
      var sortOrder = 1;
      if(notes[0] === "-") {
          sortOrder = -1;
          notes = notes.substr(1);
      }
      return function (a,b) {
          if(sortOrder == -1){
              return b[notes].localeCompare(a[notes]);
          }else{
              return a[notes].localeCompare(b[notes]);
          }        
      }
  }
    

    // doFilter(){
    //   if
    // }
    filterByDate(event) {
      const{filteredTitle} = this.state
      let newNoteList = filteredTitle.reverse()
      this.setState({
        notes: newNoteList.sort((a,b) => a.createdAt > b.createdAt)
      }) 
     }
    

    handleSort=(e)=>{
      this.setState({sort: e.target.value})
    }
    onChange = (e) => {
      this.props.setTitle(e.target.value);
  }

    handleSubmit=(e)=>{
      e.preventDefault();

    }
    updateSearch(event){
      this.setState({search: event.target.value.substr(0,20)})
    }

 

    render(){
      let filteredTitle = this.props.notes.filter(
        (note) =>{
          console.log(note);
          return note.title.toLowerCase().indexOf(this.state.search.toLocaleLowerCase()) !== -1
        }
      );
        const {notes, classes, selectedNoteIndex} = this.props;
        if(notes){
            return(
                <div className={classes.sidebarContainer}>
                <Button
                  onClick={this.newNoteBtnClick}
                  className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel' : 'New Note'}</Button>
              
                  {
                    this.state.addingNote ? 
                    <div>
                         <input type='text'
                      className={classes.newNoteInput}
                      placeholder='Enter note title'
                      // onKeyUp={(e) => this.updateTitle(e.target.value)}
                      onChange={this.onChange}
                      >
                    </input>
                    <Button className={classes.newNoteSubmitBtn}
                    onClick ={this.newNote} >Submit Note</Button>
                    </div> :
                     null
                }
                <Divider/>
                <FaSearch className="searchIcon"/> <Input id="searchbox" 
                label="Search note" 
                placeholder="Search note.." 
                value={this.state.search}
                onChange={this.updateSearch.bind(this)} />

              <Divider/>
              <div className="sortbar">
                {/* <SearchArea handleSort={this.handleSort}/> */}
              <Button   onClick={() => console.log ('Added to favorites!' )} ><FaSortAmountDownAlt  className="sort"
                //onChange={this.}
              /></Button>
              <Button  onClick={this.state.filterByDate}><FaFilter className="filter"/></Button>  
              </div>
                
                <List>
              {
                filteredTitle.map((_note, _index) => {
                  return(
                    <div key={_index}>
                      <SidebarItemComponent
                        _note={_note}
                        _index={_index}
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={this.selectNote}
                        deleteNote={this.deleteNote}>
                      </SidebarItemComponent>
                      <Divider/>
                    </div>
                  )
                })
              }
            </List>
            </div>
            )
        }else{
            return(<div>no note</div>)
        }      
    }
    newNoteBtnClick = () =>{
       this.setState({title: null, addingNote: !this.state.addingNote});
    }
    updateTitle=(txt) =>{
        this.setState({title: txt});
    }
    newNote = () => {
        console.log(this.state);
        this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
    }
    selectNote = (n,i) => {
      console.log(this.state);
      this.props.selectNote(n, i);
  }
    // selectNote = (n, i) => this.props.selectNote(n, i);
    deleteNote=(note)=>this.props.deleteNote(note);
    // console.log('delete select');
}

// function noteForm(props){
//     return(
//         <List>
//         {
//            props.notes.map((notes)=>{
//             return(
//                 <div key= {notes._id}>
//                         <SidebarItemComponent>
//                         {notes.title}
//                         select
//                         </SidebarItemComponent>
//                         <Divider></Divider>
//                 </div>
//             )
//            })
                
//             }
            
        
//     </List>
//     )
// }

export default withStyles(styles)(SidebarComponent);