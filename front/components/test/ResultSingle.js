import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "../include/Header";
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/testResultSingle_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
import moment from "moment";
const reducer = ({ main, testResultSingle, test }) => ({ main, testResultSingle, test });

class ResultSingle extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            certified: false
        }
    }
    componentDidMount() {
        const {match, dispatch} = this.props;
        
        let cc = {
        };
        // dispatch(actions.getTests(cc));
        dispatch(actions.getTestSingle(cc, match.params.id));
        
        // if(this.props.testResultSingle.result?.result <=70) {
        //     this.setState({certified: true})
        // }
        // else {
        //     this.setState({certified: false})
        // } 
        
    }
    render() {
         const {testResultSingle:{result, loading, certified}} = this.props;
        // console.log(this.props.testResultSingle.result.test)
        console.log(certified)
        let fakeLesson = [
            {price: 25000, title: "fakeLesson 1"},
            {price: 20000, title: "fakeLesson 2", isPremuim: true},
            {price: 20000, title: "fakeLesson 3", isPremuim: false},
            {price: 20000, title: "fakeLesson 4", isPremuim: false},
            {price: 20000, title: "fakeLesson 5", isPremuim: true},

        ]
        let fakeTest = [
            {price: 25000, title: "fakeTest 1", duration: 40, hasCertificate: true},
            {price: 20000, title: "fakeTest 2", duration: 30, hasCertificate: false},
            {price: 0, title: "fakeTest 3", duration: 20, hasCertificate: true},
            {price: 1, title: "fakeTest 4", duration: 60, hasCertificate: false},
        ]
        function printGrade (score) {

            if (score < 0 || score > 100) return 'INVALID SCORE';
            if (score == 100) return 'A+';
          
            var decimal = score % 10;
            score = Math.floor(score / 10);
            var scores = ['F', 'F', 'F', 'F', 'F', 'F', 'D', 'C', 'B', 'A'];
            var grade = scores[score];
          
            if (grade != 'F') {
              if (decimal <= 2) grade += '-';
              else if (decimal >= 8) grade += '+';
            }

            return grade;
        }
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
                                                {result.test?.title}
                                            </h4>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            {
                                                certified ?
                                                    <button className="bigButton">СЕРТИФИКАТ АВАХ </button>
                                                    :
                                                    <button className="bigButton" disabled>СЕРТИФИКАТ АВАХ </button>
                                            }
                                            
                                        </Col>
                                    </Row>
                                    <div className="list">
                                        <Row>
                                                <Col xl={6} lg={6} md={6} sm={12}>
                                                    <ul>
                                                        <li>
                                                            <div className="listItem">
                                                                <div>
                                                                    <ion-icon name="alarm-outline"></ion-icon>
                                                                </div>
                                                                ХУГАЦАА: 60 минут
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="listItem">
                                                                <div >
                                                                    <ion-icon name="pricetags-outline"></ion-icon>
                                                                </div>
                                                                ҮНЭ: 20,000₮
                                                            </div>
                                                            
                                                        </li>
                                                        <li>
                                                            <div className="listItem">
                                                                <div>
                                                                    <ion-icon name="repeat"></ion-icon> 
                                                                </div>
                                                                ДАВТАМЖ: Нэг удаа.

                                                            </div>
                                                           
                                                        </li>
                                                        

                                                    </ul>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={12}>
                                                    <ul>
                                                        <li>
                                                            <div className="listItem">
                                                                <div>
                                                                    <ion-icon name="star-half-outline"></ion-icon> 
                                                                </div>
                                                                АВСАН ҮНЭЛГЭЭ: {result?.result} {result?.result ? printGrade(result?.result) : ''}
                                                            </div>
                                                            
                                                        </li>
                                                        <li>
                                                            <div className="listItem">
                                                                <div>
                                                                    <ion-icon name="checkmark-done-outline"></ion-icon>
                                                                </div>
                                                                АВСАН ОНОО: {result?.correctQuestions} / {result?.questionsNumber}
                                                            </div>
                                                            
                                                        </li>
                                                        <li>
                                                            <div className="listItem">
                                                                <div>
                                                                    <ion-icon name="reader-outline"></ion-icon>
                                                                </div>
                                                                СЕРТИФИКАТ: {certified ? 'Шаардлага хангасан.' : 'Шаардлага хангаагүй.'}
                                                            </div>
                                                            
                                                        </li>
                                                    </ul>
                                                </Col>
                                        </Row>
                                    </div>
                                    <hr/>
                                    <Row>
                                        <div className="resultOpen">
                                            {
                                                result?.test?.secret && !result?.test?.hasCertificate ? 
                                                <button disabled>
                                                    ХАРИУ ХАРАХ
                                                </button>
                                                :
                                                <button>
                                                    ХАРИУ ХАРАХ
                                                </button>
                                            }
                                            
                                        </div>
                                    </Row>
                                    <div className="recomm">
                                        
                                        <h5 style={{
                                            marginTop: '10px',
                                            marginBottom: '40px'
                                        }}>
                                            Санал болгох хичээлүүд
                                        </h5>
                                        <Row>
                                            {
                                                (fakeLesson || []).map((item, index) => (
                                                    <Col xl={3} lg={4} md={6} sm={6} style={{marginBottom: 30}}>
                                                        <div key={index} className="testCard"
                                                            style={{background: 'url("/images/defaultLessonResult.png")', backgroundSize:'200px 110px'}}>
                                                            <div className="cardContent">
                                                                {item.title}
                                                                <br/>
                                                                Тайлбар
                                                                <br/>
                                                            <span style={{color: '#ffc107', fontSize: 14}}> Үнэ: {item.price}₮</span>
                                                            <div className="premuimTagResult" style={item.isPremuim? {} : {backgroundColor: '#62C757', border: 'none', color: '#fff'}}> 
                                                            {item.isPremuim ? 'PREMUIM' : 'ҮНЭГҮЙ'} </div>
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
                                            Санал болгох тестүүд
                                        </h5>
                                        <Row>
                                            {
                                                (fakeTest || []).map((item, index) => (
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