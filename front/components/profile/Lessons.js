import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "../include/Header";
import Footer from "../include/Footer";
import {Container, Row, Col, Button, Tabs, Tab, Accordion, Card, Form} from "react-bootstrap";
import * as actions from '../../actions/profile_actions';
import config from "../../config";
import Loader from "../include/Loader";
import Sidebar from "./Sidebar";
const reducer = ({ main, profile }) => ({ main, profile });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const {dispatch, history, main: {user}} = this.props;
        if(user) {
            window.scroll(0, 0);
            dispatch(actions.getLessonsProf(user._id));
        } else {
            history.push('/');
        }
    }

    render() {
        const {main: {user}, profile: {bundles, lessons, loadingLessons}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <Container>
                    <div className="profile-container">
                        <Row>
                            <Col md={3}>
                                <Sidebar location={this.props.location}/>
                            </Col>
                            <Col md={9}>
                                <div className="profile history">
                                    <Loader status={loadingLessons}>
                                        <h4>Худалдан авсан хичээлүүд</h4>
                                        {
                                            bundles.length > 0 || lessons.length > 0 ? (
                                                <div>
                                                    {/*{*/}
                                                    {/*    bundles.length > 0 ? (*/}
                                                    {/*        <div style={{marginBottom: 20}}>*/}
                                                    {/*            <h5 style={{fontSize:16, fontWeight: 600}}>Багцууд:</h5>*/}
                                                    {/*            {*/}
                                                    {/*                bundles.map((item , index) => (*/}
                                                    {/*                    <Link to={`/bundle/${item.slug}`} key={index} className={`history-item`}>*/}
                                                    {/*                        <div style={{display: 'inline-block'}}>*/}
                                                    {/*                            <span className="ind">{index+1}</span>*/}
                                                    {/*                            <span className="date">{item.title}</span>*/}
                                                    {/*                        </div>*/}
                                                    {/*                        <div style={{display: 'inline-block', float: 'right'}}>*/}
                                                    {/*                            <span className={`date`}>{moment(item.trans_date).format('YYYY/MM/DD')}</span>*/}
                                                    {/*                        </div>*/}
                                                    {/*                    </Link>*/}
                                                    {/*                ))*/}
                                                    {/*            }*/}
                                                    {/*        </div>*/}
                                                    {/*    ) : null*/}
                                                    {/*}*/}
                                                    {
                                                        lessons.length > 0 ? (
                                                            <div>
                                                                <h5 style={{fontSize:16, fontWeight: 600}}>Хичээлүүд:</h5>
                                                                {
                                                                    lessons.map((item , index) => (
                                                                        <Link to={`/lesson/${item.slug}`} key={index} className={`history-item`}>
                                                                            <div style={{display: 'inline-block'}}>
                                                                                <span className="ind">{index+1}</span>
                                                                                <span className="date">{item.title}</span>
                                                                            </div>
                                                                            <div style={{display: 'inline-block', float: 'right'}}>
                                                                                <span className={`date`}>{moment(item.trans_date).format('YYYY/MM/DD')}</span>
                                                                            </div>
                                                                        </Link>
                                                                    ))
                                                                }
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                            ) : (
                                                <div className='empty-data'>
                                                    <div className='emtry-picture'>
                                                        <img src="/images/empty.svg" />
                                                    </div>
                                                    <div className='emtry-text'>
                                                        Худалдан авсан хичээл алга байна
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Loader>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);