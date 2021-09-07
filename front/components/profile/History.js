import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from "../include/Header";
import Footer from "../include/Footer";
import {Container, Row, Col, Modal} from "react-bootstrap";
import * as actions from '../../actions/profile_actions';
import config from "../../config";
import Loader from "../include/Loader";
import Sidebar from "./Sidebar";
const reducer = ({ main, profile }) => ({ main, profile });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            show: false
        };
    }

    componentDidMount() {
        const {dispatch, history, main: {user}} = this.props;
        config.get('ga').pageview(window.location.pathname + window.location.search);
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
            case "finished":
                return 'Дууссан';
            case "expired":
                return 'Дууссан';
            default:
                return ''
        }
    }

    render() {
        const {main: {user}, profile: {histories, loadingHistory}} = this.props;
        let {data} = this.state;
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
                                                    <div key={index} onClick={() => this.setState({show: true, data: item})} className={`history-item ${item.status}`}>
                                                        <div style={{display: 'inline-block'}}>
                                                            <span className="ind">{index+1}</span>
                                                            <span className="date">{moment(item.created).format('YYYY/MM/DD')}</span>
                                                            <span className="items">
                                                                {
                                                                    item.type === 'premium' ? (
                                                                        <React.Fragment>
                                                                            Premium эрх
                                                                        </React.Fragment>
                                                                    ) : (
                                                                        item.type === 'eish' ? (
                                                                            <React.Fragment>
                                                                                ЭЕШ эрх
                                                                            </React.Fragment>
                                                                        ) : (
                                                                            <React.Fragment>
                                                                                Хичээл 1
                                                                            </React.Fragment>
                                                                        )
                                                                    )
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
                <Modal show={this.state.show} onHide={() => this.setState({show: false, data: {}})}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{fontSize: 18, fontWeight: 600}}>Худалдан авалтын мэдээлэл</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="histmodal-item">
                            <span className="date">Огноо: <span>{moment(data.created).format('YYYY/MM/DD')}</span></span>
                            {
                                data.accepted && data.status === 'success' ? (
                                    <span className="date">Идэвхэжсэн огноо: <span>{moment(data.accepted).format('YYYY/MM/DD')}</span></span>
                                ) : null
                            }
                            <span className="date">
                                Гүйлгээний утга: <span>{data.description}</span>
                            </span>
                            {
                                data.lesson ? (
                                    <React.Fragment>
                                        <span className="date" style={{marginTop: 15}}>Хичээл:</span>
                                        <div>
                                            <div className="item">
                                                <p><Link target="_blank" to={`/lesson/${data.lesson.slug}`} className="tit">{data.lesson.title}</Link><span className="cost">{config.formatMoney(data.amount)}₮</span></p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ) : null
                            }
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, borderTop: '1px solid #eee', paddingTop: 15}}>
                                <span className="price date">Нийт: <span>{config.formatMoney(data.amount)}₮</span></span>
                                <span className={`status ${data.status}`}>{this.printStats(data.status)}</span>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);