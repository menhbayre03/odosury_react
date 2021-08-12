import React, { Component } from "react";
import { connect } from 'react-redux';
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/testLaunch_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import TestSideBar from "./testComponents/TestSideBar"
import Question from "./testComponents/Question";
import Pagination from "./testComponents/Pagination";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
import moment from "moment";
import testLaunch from "../../reducers/testLaunch";
const reducer = ({ main, testLaunch, test }) => ({ main, testLaunch, test });

class TestLaunch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionMainNum: 0,
            timer: 0
        };
       
        this.changingPage = this.changingPage.bind(this);
        this.selectingAnswer = this.selectingAnswer.bind(this);
    }
    componentDidMount() {
        const {match, dispatch, testLaunch:{openTest, loading}} = this.props;
        let cc = {
        };
        dispatch(actions.getTest(cc, match.params.slug));
        let self = this;
        this.getTestSeconds = config.get('emitter').addListener('testSingleGetSeconds', function(data) {
            if (data.success) {
                self.setState({
                    timer: data?.timer
                }, () => {
                    let interval = setInterval(() => {
                        self.setState({
                            timer: (self.state.timer - 1)
                        })
                        if(self.state.timer === 0)  {clearInterval(interval)}
                     }, 1000)
                });
            }
        });
    }
    componentWillUnmount() {
        this.getTestSeconds.remove();
    }
    selectingAnswer(e, question_id, answer_id) {
        const {testLaunch:{openTest, loading}} = this.props;
        console.log(openTest)
        this.props.dispatch(actions.selectedAnswer({_id: openTest._id, question_id, answer_id}))
    }
    changingPage(e, question_id, answer_id) {
        const {testLaunch:{openTest, loading}} = this.props;
        this.setState({questionMainNum: e}, () => {
            if(question_id && answer_id){
                this.props.dispatch(actions.postAnswers({_id: openTest._id, question_id, answer_id}))
            }
        });
    }
    render() {
        const {test: {tests}} = this.props;
        const {testLaunch:{openTest, loading}} = this.props;
        const demoTest = [];
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes*60;
        console.log(openTest.leftSeconds)
        // for (let i = 0; i < 10; i++) {
        //     demoTest.push({
        //         _id:i,
        //         title: `test ${i+1}`,
        //         price: 20000,
        //         secret: true,
        //         oneTime: true,
        //         hasCertificate: false,
        //         // *** ed nariig avchrahgu, orond n questionQuantity, questionDuration avchirna ***
        //         // easyQuestion:[
        //         //     {quantity:1, type:'selectOne'},
        //         //     {quantity:1, type:'selectMany'},
        //         // ],
        //         // mediumQuestion:[
        //         //     {quantity:1, type:'selectOne'},
        //         //     {quantity:1, type:'selectMany'},
        //         // ],
        //         questionQuantity: 20,
        //         questionDuration: 60,
        //     });
        // }
        return (
            <React.Fragment>
                <div className="testHeader1">
                        <div className="logo" style={{display: 'inline-block'}}>
                        
                            <img src="/images/odosuryo.png" alt="" style={{width: 175}} />
                        </div>
                </div>
                <div className="list-container" style={{minHeight: 'calc(100vh - 40px)', backgroundColor:'#f2e8e9'}}>
                        
                    <Container>
                            <div className="container">
                                <Row>
                                    <Col xl={3} lg={3} md={6} sm={6}>
                                        <div className="sideBarPage">
                                            <TestSideBar answerSelect={this.selectingAnswer} answer={this.state.selectedAnswer} pageNum={this.state.questionMainNum} question={(openTest.questions || [])[this.state.questionMainNum]} changeNum={this.changingPage}/>
                                        </div>
                                    </Col>
                                    <Col xl={8} lg={8} md={5}>
                                        <div className="mainSection" >
                                            <Row>
                                                <div className="headerTestLaunch">
                                                    <div className="timer" >
                                                    Хугацаа: {minutes} : {seconds}
                                                    </div>
                                                    <div className="titleHeader">
                                                        {openTest?.test?.title}
                                                    </div>
                                                    
                                                </div>
                                            </Row>
                                            <Row>
                                                <Question answerSelect={this.selectingAnswer} answer={this.state.selectedAnswer} question={(openTest.questions || [])[this.state.questionMainNum]} pageNum={this.state.questionMainNum} changeNum={this.changingPage}/>
                                            </Row>
                                            <Row>
                                                <Pagination  answerSelect={this.selectingAnswer} answer={this.state.selectedAnswer} question={(openTest.questions || [])[this.state.questionMainNum]} pageNum={this.state.questionMainNum} changeNum={this.changingPage}/>
                                            </Row>
                                        </div>
                                    </Col>
                                    
                                </Row>
                            </div>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(TestLaunch);