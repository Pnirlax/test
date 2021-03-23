import React from 'react'
import Layout from '../core/Layout'
import {Carousel} from 'react-bootstrap'
import slide1 from '../images/slide1.jpg'
import slide2 from '../images/slide2.jpg'
import slide3 from '../images/slide3.jpg'
import back from '../images/col4.jpg'

export default function Home() {
    return (
        <div className='mainhome' style={{backgroundImage: `url(${back})`}}>
        <Layout >
             <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide1}
      alt="First slide"
    />
    <Carousel.Caption className="c-content">
      <h3 id="title">MyNote app</h3>
      <p>MyNote app helps the user to capture what is on<br/> their mind
           by creating written notes and  uploading pictures, all this 
           in a single application.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide2}
      alt="Third slide"
    />

    <Carousel.Caption className="c-content">
    <h3 id="title">MyNote app</h3>
      <p>MyNote app helps the user to capture what is on<br/> their mind
           by creating written notes and  uploading pictures, all this 
           in a single application.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide3}
      alt="Third slide"
    />

    <Carousel.Caption className="c-content">
    <h3 id="title">MyNote app</h3>
      <p>MyNote app helps the user to capture what is on<br/> their mind
           by creating written notes and  uploading pictures, all this 
           in a single application.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </Layout>
        </div>
       
    )
}
