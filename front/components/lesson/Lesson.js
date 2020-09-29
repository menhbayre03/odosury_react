import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import * as actions from '../../actions/lesson_actions';
const reducer = ({ main, lesson }) => ({ main, lesson });

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="lesson-single" style={{position: 'relative', minHeight: 'calc(100vh - 185px)'}}>
                    <div className="lesson-head">
                        <Container>
                            <Row>
                                <Col md={8}>
                                    <h2>Learn JavaScript From Scratch</h2>
                                </Col>
                                <Col md={4}>

                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Lesson);