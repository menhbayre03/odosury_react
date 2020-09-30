import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Container, Row, Col } from "react-bootstrap";
import * as actions from '../../actions/lesson_actions';
import ReactStars from "react-rating-stars-component";
const reducer = ({ main, lesson }) => ({ main, lesson });

class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        dispatch(actions.getLesson(match.params.slug));
    }

    render() {
        const {lesson: {lesson}} = this.props;
        let rating = 0;
        if((lesson.rating || []).length > 0) {
            rating = lesson.rating.reduce((total, rate) => (total + rate.rate), 0) / lesson.rating.length
        }
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="lesson-single" style={{position: 'relative', minHeight: 'calc(100vh - 185px)'}}>
                    <div className="lesson-head">
                        <Container>
                            <Row>
                                <Col md={8}>
                                    <h2>{lesson.title}</h2>
                                    <p>{lesson.description}</p>
                                    <div>
                                        <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                            <ReactStars
                                                count={5}
                                                value={rating}
                                                edit={false}
                                                size={16}
                                            />
                                            <span style={{fontSize: 12, color: '#909090', marginLeft: 5}}>({(lesson.rating || []).length})</span>
                                        </div>
                                        <span>1200 Enerolled</span>
                                    </div>
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