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
                <Header/>
                <div style={{minHeight: '100vh'}}>
                    <h2>LESSON</h2>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Lesson);