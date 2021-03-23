import React, {Component, useEffect} from 'react'
import {Modal, Button,  Row, Col, Form,ListGroup, ListGroupItem, Alert} from 'react-bootstrap';
import { Input } from '@material-ui/core';
import {  FaTrash } from "react-icons/fa";
import axios from 'axios'
export class AddCategory extends Component{
    constructor(props){
        super(props);
        this.state={
            categoryName:'',
            categories: null,        
            config: {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            },
            isUpdate: false,
            categoryId: ''
        }


    }    
    componentDidMount() {
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

    handleChange = (e) => {
        this.setState({ categoryName: e.target.value }, () => {
            if (this.state.categoryName === '') {
                this.setState({ isUpdate: false }, )
            }
        });
    }
 

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.categoryName === '') return;
        if (this.state.isUpdate === false) {
            axios.post(`${process.env.REACT_APP_API}/category`, { category: this.state.categoryName },
                this.state.config)
                .then((res) => {
                    this.setState({
                        categories: [...this.state.categories, res.data],
                        categoryName: ''
                    })
               }).catch(err => console.log(err.response.data.message));
        } else {
            axios.put(`${process.env.REACT_APP_API}/mycategories/${this.state.categoryId}`,
                { category: this.state.categoryName }, this.state.config)
                .then((res) => {
                    console.log(res)
                    const updatedCategories = this.state.categories.map((category) => {
                        if (category._id === this.state.categoryId) {
                            category.category = this.state.categoryName;
                        }
                        return category;
                    })
                    this.setState({
                        isUpdate: false,
                        categories: updatedCategories,
                        categoryName: ''
                    })
                }).catch(err => console.log(err.response));
        }
    }

    editCategory = (categoryId) => {
        console.log(categoryId)
        this.setState({
            categoryName: this.state.categories.find((category) => {
                return category._id=== categoryId;
            }).category,
            categoryId: categoryId,
            isUpdate: true
        });
    }

    deleteCategory = (categoryId) => {
        if (window.confirm(`Are you sure you want to delete this category?`)) {
            const filteredCategories = this.state.categories.filter((category) => {
                return category._id !== categoryId;
            })
            axios.delete(`${process.env.REACT_APP_API}/mycategories/${categoryId}`, this.state.config)
                .then((res) => {
                    this.setState({
                        categories: filteredCategories,
                        isUpdate: false,
                        categoryName: ''
                    })
                }).catch((err) => console.log(err));
        }
    }
    render(){

        if(!this.state.categories)
            return "";

        return(
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
                <CategoryForm
                    category={this.state.categoryName}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    isUpdate={this.state.isUpdate} />
                   <hr />
                <CategoryList categories={this.state.categories}
                    deleteCategory={this.deleteCategory}
                    editCategory={this.editCategory} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }
}

function CategoryForm(props) {
    return (
        <Row>
        <Col sm={6}>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group>
                    <Form.Label>Category</Form.Label><br/>
                    <Input
                    type="text" 
                    required
                    value={props.category}
                    
                    onChange={props.handleChange}
                    placeholder="AddCategory.."/>
                </Form.Group>
                {
                    props.isUpdate? (
                        <Form.Group>
                    <Button variant="warning" type="submit">
                        Update Category
                    </Button>
                </Form.Group>
                    ):(
                        <Form.Group>
                        <Button className="activatebtn" variant="success" type="submit">
                            Add Category
                        </Button>
                    </Form.Group>
                    )
                }
               
            </Form>
        </Col>
    </Row>
    )
}

function CategoryList(props) {
    
    return (
        <>
            <ListGroup>
                {
                    props.categories.map((category) => {
                        //console.log(category);
                        return <ListGroupItem key={category._id}>
                            
                            <div className="row">
                            <span className="col-sm-8" onClick={() => props.editCategory(category._id)}>{category.category}</span>
                           <FaTrash id="del" onClick={() => props.deleteCategory(category._id)} className="col-sm-4" />
                           </div>
                        </ListGroupItem>
                    })
                }
            </ListGroup>
        </>
    )
}