import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { FaPlusCircle } from "react-icons/fa";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


 class FileUploadButton extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Button className={classes.upload} color='success' onClick={this.props.uploadFile} block><FaPlusCircle/>  Insert Image</Button>
        )
    }
    uploadFile = () => this.props.selectNote();
}
export default withStyles(styles)(FileUploadButton)
