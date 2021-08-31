import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/test_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
import moment from "moment";
const reducer = ({ main, test, lesson }) => ({ main, test, lesson });

class ResultSingle extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }
    componentDidMount() {
        const {match, dispatch} = this.props;
        const dis = this;
        let cc = {
        };
        dispatch(actions.getTests(cc));
        dispatch(actions.getList(match.params.slug, {sort: this.state.sort.value, search: this.state.search}));
    }
    render() {
        const {test:{tests, loading, all, openTest}} = this.props;
        let slug = this.props.match.params.slug;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="list-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <Container>
                        <Row>
                            <Col xl={12}>
                                <div className="list-content">
                                    <div className="list-header">
                                        <div>
                                            <h3>Тестийн хариу</h3>
                                        </div>
                                    </div>
                                </div>
                            <Loader>
                                <div className="resultSingle">
                                    <Row>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <h4 style={{ fontWeight: 600,
                                                        marginLeft: 20}}>
                                                Жишээ тест 1
                                            </h4>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <button>СЕРТИФИКАТ АВАХ </button>
                                        </Col>
                                    </Row>
                                    <div className="list">
                                        <Row>
                                                <Col xl={6} lg={6} md={6} sm={12}>
                                                    <ul>
                                                        <li>
                                                            ХУГАЦАА: 60 минут
                                                        </li>
                                                        <li>
                                                            ҮНЭ: 20,000₮
                                                        </li>
                                                        <li>
                                                            ДАВТАМЖ: Нэг удаа.
                                                        </li>
                                                        <li>
                                                            СЕРТИФИКАТ: Шаардлага хангасан.
                                                        </li>

                                                    </ul>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={12}>
                                                    <ul>
                                                        <li>
                                                            АВСАН ҮНЭЛГЭЭ: 92 A-                                                    </li>
                                                        <li>
                                                            АВСАН ОНОО: 46/50
                                                        </li>
                                                    </ul>
                                                </Col>
                                        </Row>
                                    </div>
                                    <hr/>
                                    <Row>
                                        <div className="resultOpen">
                                            <button>
                                                ХАРИУ ХАРАХ
                                            </button>
                                        </div>
                                    </Row>
                                    <div className="recomm">
                                        <h5 style={{
                                            marginTop: '10px',
                                            marginBottom: '40px'
                                        }}>
                                            Санал болгох тестүүд
                                        </h5>
                                        <Row>
                                            {
                                                (tests || []).map((item, index) => (
                                                    <Col xl={3} lg={4} md={6} sm={6} style={{marginBottom: 30}}>
                                                        <div key={index} className="testCard"
                                                            style={{background: 'url("/images/defaultTestCard1.png")', backgroundSize:'200px 110px'}}>
                                                            <div className="cardContent">
                                                                {item.title}
                                                                <br/>
                                                                    Хугацаа: {item.duration} мин
                                                                <br/>
                                                            <span style={{color: '#ffc107', fontSize: 14}}> Үнэ: {item.price}₮</span>
                                                            <div className="certifyTagTest" style={item.hasCertificate? {} : {backgroundColor: '#dc3545', border: 'none', color: '#fff'}}> 
                                                            {item.hasCertificate ? 'СЕРТИФИКАТТАЙ' : 'СЕРТИФИКАТГҮЙ'} </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                        <h5 style={{
                                            marginTop: '10px',
                                            marginBottom: '40px'
                                        }}>
                                            Санал болгох хичээлүүд
                                        </h5>
                                        <Row>
                                            {
                                                (tests || []).map((item, index) => (
                                                    <Col xl={3} lg={4} md={6} sm={6} style={{marginBottom: 30}}>
                                                        <div key={index} className="testCard"
                                                            style={{background: 'url("/images/defaultTestCard1.png")', backgroundSize:'200px 110px'}}>
                                                            <div className="cardContent">
                                                                {item.title}
                                                                <br/>
                                                                    Хугацаа: {item.duration} мин
                                                                <br/>
                                                            <span style={{color: '#ffc107', fontSize: 14}}> Үнэ: {item.price}₮</span>
                                                            <div className="certifyTagTest" style={item.hasCertificate? {} : {backgroundColor: '#dc3545', border: 'none', color: '#fff'}}> 
                                                            {item.hasCertificate ? 'СЕРТИФИКАТТАЙ' : 'СЕРТИФИКАТГҮЙ'} </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))
                                            }
                                        </Row>

                                    </div>

                                </div>
                            </Loader>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default  connect(reducer)(ResultSingle);