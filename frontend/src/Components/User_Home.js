import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../Components/Helpers';
import { FormGroup, Input, CustomInput} from 'reactstrap'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import axios from 'axios'
import { toast } from 'react-toastify';


class UserHomeComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            title:'',
            body:'',
            categories:[],
            image:null,
            config: {
                headers: { authorization: "Bearer " + localStorage.getItem('token') }
            },
            _id:'',
            selectedFile: null

        }

    }



    componentDidMount=() =>{

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/mycategories`,
            headers: this.state.config.headers
           
        })
            .then((res) => {
                console.log(res);
                this.setState({ categories: res.data })
            }).catch((err) => console.log(err));

              

    }


    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile=(e) =>{
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post(`${process.env.REACT_APP_API}/upload`, data,
                this.state.config)
                .then((res) => {
                    this.setState({
                        // notes: [...this.state.notes, res.data],
                        title: this.state.title,
                        body : this.state.body,
                        image : res.data.filename,
                        category : this.state.category,
                        // user :this.state.user._id
                    })
                    toast.success('Image insterted sucessfully!!')
                    }).catch(err => {
                        if(err.response && err.response.data.message){
                        console.log(err.response.data.message);
                        }else{
                            console.log(err.message);
                        }
                    });

    }

    
    render(){
        const {classes} = this.props;
        return(
         
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <Input
            className={classes.titleInput}
            placeholder="Note title..."
            value={ this.props.selectedNote.title ? this.props.selectedNote.title:this.state.title}
            onChange={this.updateTitle}></Input>
          
            {/* <Button className={classes.savebtn}><FaRegSave className={classes.i}/>   Save</Button>   */}
        <ReactQuill 
            value={this.props.selectedNote.body ? this.props.selectedNote.body: this.state.body}
            onChange={this.updateBody} ref={input => { this.bodyInput = input;}}>
                
            </ReactQuill><br/>
                {/* <div className={classes.images}>
                    <img className={classes.srcimg} src="note.jpg"/>
                </div> */}
                {/* <img className='alert'
                                width='400' src={this.uploadFile}
                                alt="Note Image" /> */}
               <CustomInput className={classes.image}type='file' id='image'
                    onChange={this.handleFileSelect} value={this.props.selectedNote.image ? this.props.selectedNote.image: this.state.image} />
                   {/* {this.state.selectedFile ? ( <FileUploadButton 
                     uploadFile={this.uploadFile} />) : null} */}
                                             
            
            <FormGroup >
                <Input type='select'onChange={this.updateCategory} value={this.props.selectedNote.category ? this.props.selectedNote.category: this.state.category} className={classes.man}>
                    <option id="opt" key="0" value="0" >Select Category</option>
                    {
                        this.state.categories.map((categories) => {
                            return (
                            
                            <option value={categories._id} key={categories._id}  className={classes.mans } >
                                {categories.category}
                            </option>)
                        })
                    }
                </Input>
            </FormGroup>
        </div>
     

        
        
        
        )
    }
    onChange = (e) => {
        this.props.setTitle(e.target.value)
        this.props.setBody(e.target.value)
        this.props.setImage(e.target.value);
        this.props.setCategory(e.target.value);
        ;
    }

    updateBody = (val)=>{
        this.props.noteUpdateHandler("body", val);
        this.update();
    };

    updateTitle= (title) =>{
        this.props.noteUpdateHandler("title", title.target.value);
        this.update();
    }
    updateCategory= async(category) =>{
        this.props.noteUpdateHandler("category", category.target.value);
        this.update();
    }
    // uploadFile= (image) =>{
    //     this.props.noteUpdateHandler("image", image.target.value);
    //     this.update();
    // }
    update = debounce(()=>{
        console.log(this.state._id);
        this.props.noteUpdate();
    }, 1500);
}

export default withStyles(styles)(UserHomeComponent)