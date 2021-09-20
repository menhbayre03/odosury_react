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
            certified: false,
            questionsOpen: false,
            questionNumber: 0,
        }
    }
    componentDidMount() {
        const {match, dispatch} = this.props;
        
        let cc = {
        };
        // dispatch(actions.getTests(cc));
        dispatch(actions.getTestSingle(cc, match.params.id));
        
        
        
    }
    
    questions() {
        if(this.state.questionsOpen) {
            this.setState({questionsOpen: false})
        } else this.setState({questionsOpen: true})
    }
    prevQuestion() {
        console.log('hehe')
        let number = this.state.questionNumber;
        if(number>0) {
            this.setState({questionNumber: number-1})
        }
    }
    nextQuestion() {
        let number = this.state.questionNumber;
        let max=this.props.testResultSingle?.result?.questionsNumber;
        if(number<max-1) {
            
            this.setState({questionNumber: number+1})
        }
    }
    render() {
         const {testResultSingle:{result, loading, certified}} = this.props;
        // console.log(this.props.testResultSingle.result.test)
        console.log(this.state.questionNumber)
        
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
                                                {result?.title}
                                            </h4>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            {
                                                certified && result.hasCertificate ?
                                                    <button className="bigButton">СЕРТИФИКАТ АВАХ </button>
                                                    :
                                                    <button className="bigButton" disabled>СЕРТИФИКАТГҮЙ </button>
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
                                                                    <ion-icon name="hourglass-outline"></ion-icon>
                                                                </div>
                                                                ХУГАЦАА: {result?.duration} минут
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="listItem">
                                                                <div >
                                                                    <ion-icon name="pricetags-outline"></ion-icon>
                                                                </div>
                                                                ҮНЭ: {result?.price}₮
                                                            </div>
                                                            
                                                        </li>
                                                        <li>
                                                            <div className="listItem">
                                                                <div>
                                                                    <ion-icon name="repeat"></ion-icon> 
                                                                </div>
                                                                ДАВТАМЖ: { result?.oneTime ?
                                                                    "Нэг удаа."
                                                                    :
                                                                    "Давтамжгүй."
                                                                }

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
                                                                АВСАН ҮНЭЛГЭЭ: {Math.round(result?.result)} {result?.result ? printGrade(result?.result) : ''}
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
                                                                СЕРТИФИКАТ: {result?.hasCertificate && certified ? 'Шаардлага хангасан.' : !result.hasCertificate ? 'Сертификатгүй шалгалт.' : 'Шаардлага хангаагүй.'}
                                                            </div>
                                                            
                                                        </li>
                                                        <li>
                                                            <div className="listItem">
                                                                <div>
                                                                    <ion-icon name="time-outline"></ion-icon>
                                                                </div>
                                                                ДУУСГАСАН ОГНОО: {moment(result?.created).format("HH:mm:ss / MM-DD-YYYY")}
                                                            </div>
                                                            
                                                        </li>
                                                    </ul>
                                                </Col>
                                        </Row>
                                    </div>
                                    <hr/>
                                    <Row>
                                        <div className="resultOpen">
                                            <Col xl={12}>
                                                {
                                                    this.state.questionsOpen ? 
                                                    <>
                                                        <div className="paginationQues">
                                                            {
                                                                result.questions?.map((item, index) => (
                                                                    <>
                                                                        <div className={this.state.questionNumber === index ? 'item shadowItem' : 'item'} style={ item.selectOne_answer?.some((ans)=>  item.answer === ans._id && ans.isCorrect) ?
                                                                                        {background: '#62C757'}
                                                                                        :
                                                                                        {background: '#f8513c'}
                                                                            } onClick={()=>this.setState({questionNumber: index})}>
                                                                            {index+1}
                                                                        </div>
                                                                    </> 
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="question">
                                                            <h4 style={{fontWeight: 600}}>{this.state.questionNumber+1}. {result.questions[this.state.questionNumber]?.selectOne_question?.text}</h4>
                                                            <div className="questions">
                                                            <ul>
                                                            {
                                                                result.questions[this.state.questionNumber]?.selectOne_answer.map((item, index) => (

                                                                    <li> 
                                                                        <div className="iconOut"> {
                                                                            item.isCorrect && result.questions[this.state.questionNumber]?.answer === item._id ? 
                                                                                <ion-icon name="checkmark-circle" style={{color: '#62C757'}} ></ion-icon>
                                                                            :
                                                                            !item.isCorrect && result.questions[this.state.questionNumber]?.answer === item._id ? <ion-icon name="close-circle"></ion-icon>
                                                                            :
                                                                            item.isCorrect && result.questions[this.state.questionNumber]?.answer !== item._id ? <ion-icon name="checkmark-circle" style={{color: '#aeaeae'}} ></ion-icon>
                                                                            : null
                                                                            }
                                                                        </div>
                                                                        
                                                                        <div className="text">
                                                                            {
                                                                                item._id === result.questions[this.state.questionNumber]?.answer && item.isCorrect ? 
                                                                                <span style={{
                                                                                    color: '#62C757'
                                                                                }}>
                                                                                    {item.text}
                                                                                </span>
                                                                                :
                                                                                item._id === result.questions[this.state.questionNumber]?.answer && !item.isCorrect ?
                                                                                <>
                                                                                <span style={{
                                                                                    color: 'rgb(248, 81, 60)'
                                                                                }}>
                                                                                    {item.text}
                                                                                </span>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    {item.text}
                                                                                </>   
                                                                            }
                                                                            
                                                                        </div>
                                                                        
                                                                    </li>
                                                                    
                                                                ))
                                                            }
                                                            </ul>
                                                            </div>
                                                            
                                                            <div className="buttons" >
                                                            
                                                                <button className="chevron" onClick={()=> this.prevQuestion()}>ӨМНӨХ</button>
                                                                <button className="chevron" onClick={()=> this.nextQuestion()}>ДАРААХ</button>
                                                            </div>
                                                            
                                                        </div>
                                                    </>
                                                    : null
                                                }
                                                
                                            </Col>
                                            <div className="centerButton">
                                                {
                                                    result?.secret || result?.hasCertificate ? 
                                                    <button className="openButton disabled" style={{backgroundColor: '#fff',
                                                    color: '#aeaeae' }}>
                                                        ХАРИУ ХАРАХ
                                                        <br/>
                                                        <ion-icon name="chevron-down-outline" 
                                                            style={{
                                                            position: 'absolute',
                                                            fontSize: '23px',
                                                            marginLeft: '-12px',
                                                            marginTop: '-7px',
                                                            color: '#aeaeae'}}></ion-icon>
                                                    </button>
                                                    :
                                                    <button className="openButton" onClick={()=>this.questions()}>
                                                        {
                                                            this.state.questionsOpen ?
                                                                <>
                                                                    <ion-icon name="chevron-up-outline"
                                                                        style={{
                                                                        position: 'absolute',
                                                                        fontSize: '23px',
                                                                        marginTop: '2px',
                                                                        marginLeft: '-12px',}}></ion-icon>
                                                                    <br/>
                                                                    ХАРИУ ХААХ 
                                                                </>
                                                                :
                                                                <>
                                                                    ХАРИУ ХАРАХ
                                                                    <br/>
                                                                    <ion-icon name="chevron-down-outline" 
                                                                        style={{
                                                                        position: 'absolute',
                                                                        fontSize: '23px',
                                                                        marginLeft: '-12px',
                                                                        marginTop: '-7px'}}></ion-icon>
                                                                    
                                                                </>
                                                        }
                                                        
                                                    </button>
                                                }
                                            </div>
                                            
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
                                                (result?.lessons || []).map((item, index) => (
                                                    <Col xl={3} lg={4} md={6} sm={6} style={{marginBottom: 30}}>
                                                        <Link to={'#'}>
                                                            <div key={index} className="lessonCard">
                                                                {
                                                                    item.thumbnailSmall?.url && item.thumbnailSmall?.path ?
                                                                        <img  src={`${item.thumbnailSmall.url}${item.thumbnailSmall.path}`} />
                                                                    :
                                                                        <img src={'/images/defaultLessonResult.png'}/>
                                                                }
                                                                    
                                                                <div className="lessonContent">
                                                                    {item.title}
                                                                    <br/>
                                                                    {
                                                                        item.sale ? 
                                                                        <>
                                                                            Үнэ:
                                                                            <span style={{color: '#ffc107', fontSize: 15, fontWeight: 600}}>
                                                                                <span style={{textDecoration: 'line-through', color: '#dc3545', fontSize: 12, fontWeight: 500}}>
                                                                                &nbsp; {item.price}₮
                                                                                </span> {item.sale}₮ 
                                                                            </span> 
                                                                        </> 
                                                                        :
                                                                        <>
                                                                            Үнэ: 
                                                                            <span style={{color: '#ffc107', fontSize: 14}}>
                                                                            &nbsp; {item.price}₮
                                                                            </span>
                                                                        </>
                                                                        
                                                                    }
                                                                    <div className="premuimTagResult" style={item.price> 1? {} : {backgroundColor: '#62C757', border: 'none', color: '#fff'}}> 
                                                                        {item.price> 1 ? 'PREMUIM' : 'ҮНЭГҮЙ'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
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
                                                (result?.tests || []).map((item, index) => (
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