import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./include/Header";
import { Container, Row, Col } from "react-bootstrap";
const reducer = ({ main }) => ({ main });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="home-hero" data-src="../assets/images/home-hero.png"
                     style={{backgroundImage: "url('http://demo.foxthemes.net/courseplusv3.3/assets/images/home-hero.png')"}}>
                    <Container>
                        <div className="hero-inner">
                            <h1>Learn HTML , CSS , iphone <br/> Apps More</h1>
                            <h4 className="my-lg-4"> Learn how to build websites apps <br/> write a code or start a
                                business
                            </h4>
                            <a href="#" className="btn btn-default">Free trailer </a>
                        </div>
                    </Container>
                </div>
                <div className="section-bundle">
                    <Container>
                        <h3>Багц хичээлүүд</h3>
                        <Row>
                            {
                                [1,2,3,4,5,6,7,8].map(item => (
                                    <Col md={3}>
                                        <div className="bundle-item">
                                            <img src="http://demo.foxthemes.net/courseplusv3.3/assets/images/book/vue-2-basics-.jpg" alt="" className="cover-img"/>
                                            <div className="bundle-detail">
                                                <h4>Web Development</h4>
                                                <p className="skill-card-subtitle"> 15 courses 3 bundles</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </div>
                <div className="section-bundle">
                    <Container>
                        <h3>Шинээр нэмэгдсэн хичээлүүд</h3>
                        <Row>
                            {
                                [1,2,3,4,5,6,7,8].map(item => (
                                    <Col md={3}>
                                        <div className="bundle-item">
                                            <img src="http://demo.foxthemes.net/courseplusv3.3/assets/images/book/vue-2-basics-.jpg" alt="" className="cover-img"/>
                                            <div className="bundle-detail">
                                                <h4>Web Development</h4>
                                                <p className="skill-card-subtitle"> 15 courses 3 bundles</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Home);