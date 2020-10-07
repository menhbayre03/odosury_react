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
const reducer = ({ main, bundle }) => ({ main, bundle });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            activeIndex: '0'
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
                    <p>haha</p>
                    <div className="bundle-levels">
                        <Container>
                            <Accordion activeKey={this.state.activeIndex}>
                                {
                                    (bundle.levels || []).map((item, index) => (
                                        <Card key={index}>
                                            <Card.Header>
                                                <Accordion.Toggle onClick={() => this.setState({activeIndex: this.state.activeIndex === index.toString() ? '' : index.toString()})} as={Button} variant="link" eventKey={index.toString()}>
                                                    {item.title}
                                                    {
                                                        this.state.activeIndex == index.toString() ? (
                                                            <ion-icon style={{
                                                                float: 'right',
                                                                fontSize: 24,
                                                                position: 'relative',
                                                                top: 2,
                                                            }} name="chevron-down"/>
                                                        ) : (
                                                            <ion-icon style={{
                                                                float: 'right',
                                                                fontSize: 24,
                                                                position: 'relative',
                                                                top: 2,
                                                            }} name="chevron-up"/>
                                                        )
                                                    }
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={index.toString()}>
                                                <Card.Body>
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
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))
                                }
                            </Accordion>
                        </Container>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);