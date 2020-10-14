import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
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
            dispatch(actions.getHistory(user._id));
        } else {
            history.push('/');
        }
    }

    printStats(status) {
        switch (status) {
            case "pending":
                return 'Хүлээгдэж буй';
            case "success":
                return 'Амжилттай';
            case "fail":
                return 'Цуцлагдсан';
            default:
                return ''
        }
    }

    render() {
        const {main: {user}, profile: {histories, loadingHistory}} = this.props;
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
                                    <Loader status={loadingHistory}>
                                        <h4>Худалдан авалтын түүх</h4>
                                        {
                                            histories.length > 0 ? (
                                                histories.map((item , index) => (
                                                    <div key={index} className={`history-item ${item.status}`}>
                                                        <div style={{display: 'inline-block'}}>
                                                            <span className="ind">{index+1}</span>
                                                            <span className="date">{moment(item.created).format('YYYY/MM/DD')}</span>
                                                            <span className="items">
                                                                {
                                                                    item.bundles && item.bundles.length > 0 ? (
                                                                        <React.Fragment>
                                                                            багц: <span style={{marginRight: 10}}>{item.bundles.length}</span>
                                                                        </React.Fragment>
                                                                    ) : null
                                                                }
                                                                {
                                                                    item.lessons && item.lessons.length > 0 ? (
                                                                        <React.Fragment>
                                                                            хичээл: <span>{item.lessons.length}</span>
                                                                        </React.Fragment>
                                                                    ) : null
                                                                }
                                                            </span>
                                                        </div>
                                                        <div style={{display: 'inline-block', float: 'right'}}>
                                                            <span className="price">{config.formatMoney(item.amount)}₮</span>
                                                            <span className={`status ${item.status}`}>{this.printStats(item.status)}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='empty-data'>
                                                    <div className='emtry-picture'>
                                                        <img src="/images/empty.svg" />
                                                    </div>
                                                    <div className='emtry-text'>
                                                        Худалдан авалт алга байна
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