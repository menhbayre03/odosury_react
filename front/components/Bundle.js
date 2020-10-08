import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./include/Header";
import Footer from "./include/Footer";
import { Container, Row, Col, Button, Tabs, Tab, Accordion, Card } from "react-bootstrap";
import * as actions from '../actions/bundle_actions';
import Sticky from 'react-sticky-el';
import ReactStars from "react-rating-stars-component";
import config from "../config";
import GridItem from "./include/GridItem";
import Select from "react-dropdown-select";
const reducer = ({ main, bundle }) => ({ main, bundle });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        dispatch(actions.getBundle(match.params.slug));
    }

    render() {
        const {main: {user}, bundle: {bundle}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="bundle-single">
                    <Container>
                        <div className="bundle-header">
                            <img src={(bundle.thumbnail || {}).path ? `${config.get('hostMedia')}${bundle.thumbnail.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                            <div className="bundle-header-inner">
                                <span>Багц</span>
                                <h3>{bundle.title}</h3>
                                <p>{bundle.description}</p>
                            </div>
                        </div>
                        <div className="bundle-levels">
                            <Row>
                                {
                                    (bundle.levels || []).map((item, index) => (
                                        <div key={index}>
                                            <div>
                                                {item.title}
                                                <ion-icon style={{
                                                    float: 'right',
                                                    fontSize: 24,
                                                    position: 'relative',
                                                    top: 2,
                                                }} name="chevron-down"/>
                                            </div>
                                            <div className="bundle-body">
                                                <Row>
                                                    {
                                                        (item.lessons || []).map((lesson, ind) => (
                                                            <Col key={ind} md={3} style={{marginBottom: 30}}>
                                                                <div>
                                                                    <GridItem item={lesson}/>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Row>
                        </div>
                    </Container>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);