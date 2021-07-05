import React, { Component } from "react";
import { connect } from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import config from "../config";
import moment from "moment";
import Header from "./include/Header";
import Footer from "./include/Footer";

const reducer = ({ main, payment}) => ({ main, payment});

class Premium extends Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: props.main.difference };
        this.timer = 0;
        // this.startTimer = this.startTimer.bind(this);
        // this.countDown = this.countDown.bind(this);
    }

    // secondsToTime(secs){
    //     let days = Math.floor(secs / (60 * 60 * 24));
    //
    //     let divisor_for_hours = secs % (60 * 60 * 24);
    //     let hours = Math.floor(divisor_for_hours / (60 * 60));
    //
    //     let divisor_for_minutes = secs % (60 * 60);
    //     let minutes = Math.floor(divisor_for_minutes / 60);
    //
    //     let divisor_for_seconds = divisor_for_minutes % 60;
    //     let seconds = Math.ceil(divisor_for_seconds);
    //
    //     let obj = {
    //         "d": days,
    //         "h": hours,
    //         "m": minutes,
    //         "s": seconds
    //     };
    //     return obj;
    // }
    componentDidMount() {
        window.scroll(0, 0);
        config.get('ga').pageview(window.location.pathname);
        // let timeLeftVar = this.secondsToTime(this.state.seconds);
        // this.setState({ time: timeLeftVar }, () => this.startTimer());
    }

    // componentWillUnmount() {
    //     clearInterval(this.timer)
    // }

    // startTimer() {
    //     if (this.timer === 0 && this.state.seconds > 0) {
    //         this.timer = setInterval(this.countDown, 1000);
    //     }
    // }
    //
    // countDown() {
    //     let seconds = this.state.seconds - 1;
    //     this.setState({
    //         time: this.secondsToTime(seconds),
    //         seconds: seconds,
    //     });
    //     if (seconds === 0) {
    //         clearInterval(this.timer);
    //     }
    // }

    render() {
        const { main: {premiumPrice, premium, user}} = this.props;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="premium-container" style={{minHeight: 'calc(100vh - 185px)'}}>
                    <div className="head-cont-premium">
                        <img src="/images/premium_wh.png" width={'100%'} alt=""/>
                        {/*<div className="dataa">*/}
                        {/*    <div className="datte">*/}
                        {/*        <h5>Дуусах хугацаа</h5>*/}
                        {/*        <div className="clock">*/}
                        {/*            <div className="clock-container">*/}
                        {/*                <div className="clock-col">*/}
                        {/*                    <p className="clock-day clock-timer">*/}
                        {/*                        {this.state.time.d}*/}
                        {/*                    </p>*/}
                        {/*                    <p className="clock-label">*/}
                        {/*                        Өдөр*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*                <div className="clock-col">*/}
                        {/*                    <p className="clock-hours clock-timer">*/}
                        {/*                        {this.state.time.h}*/}
                        {/*                    </p>*/}
                        {/*                    <p className="clock-label">*/}
                        {/*                        Цаг*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*                <div className="clock-col">*/}
                        {/*                    <p className="clock-minutes clock-timer">*/}
                        {/*                        {this.state.time.m}*/}
                        {/*                    </p>*/}
                        {/*                    <p className="clock-label">*/}
                        {/*                        Минут*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*                <div className="clock-col">*/}
                        {/*                    <p className="clock-seconds clock-timer">*/}
                        {/*                        {this.state.time.s}*/}
                        {/*                    </p>*/}
                        {/*                    <p className="clock-label">*/}
                        {/*                        Сэкүнд*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div>
                        <div className="main-prem">
                            <Container>
                                <div className="lapremium">
                                    <div className="optionContainer">
                                        <div className="optionCard">1</div>
                                        <div className="optionCard">2</div>
                                        <div className="optionCard">3</div>
                                    </div>
                                    <div className="benefits"></div>
                                    {/* <Row>
                                        <Col>
                                            <div className="dar">
                                                <p>PREMIUM эрх авснаар танд:</p>
                                                <ul>
                                                    <li>ODOSURY дээрх бүх хичээлүүд</li>
                                                    <li>ODOSURY дээрх бүх аудио номууд</li>
                                                    <li>Үүгээр зогсохгүй ирээдүйд тасралтгүй нэмэгдэх хичээлүүд болон номнууд бүгд Premium хэрэглэгч танд</li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="dar">
                                                <ul>
                                                    <li>Бүх насныханд зориулагдсан</li>
                                                    <li>Мэргэжлийн чадварлаг багш нарын контентууд</li>
                                                    <li>Хүссэн хичээлээ санал болгох</li>
                                                    <li>Олон талын мэдлэгтэй болох</li>
                                                    <li>24/7 онлайн үйлчилгээ</li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4} className="sec-1">
                                            <p className="desc">NOW</p>
                                            <p className="price">3 САР</p>
                                            <button onClick={() => premium ? console.log('gz') : user ? config.get('emitter').emit('paymentModal', {type: 'premium', duration: 3}) : config.get('emitter').emit('openLogin', {type: 'premium', duration: 3})}>
                                                {
                                                    premium ?
                                                        'Premium хэрэглэгч'
                                                        :   `${config.formatMoney(premiumPrice[3])}₮`
                                                }
                                                <ion-icon name="arrow-redo-circle"/>
                                            </button>
                                        </Col>
                                        <Col md={4} className="sec-2">
                                            <p className="desc">BREAKPOINT</p>
                                            <p className="price">6 САР</p>
                                            <button onClick={() => premium ? console.log('gz') : user ? config.get('emitter').emit('paymentModal', {type: 'premium', duration: 6}) : config.get('emitter').emit('openLogin', {type: 'premium'})}>
                                                {
                                                    premium ?
                                                        'Premium хэрэглэгч'
                                                        :   `${config.formatMoney(premiumPrice[6])}₮`
                                                }
                                                <ion-icon name="arrow-redo-circle"/>
                                            </button>
                                        </Col>
                                        <Col md={4} className="sec-2">
                                            <p className="desc">NON-STOP</p>
                                            <p className="price">12 САР</p>
                                            <button onClick={() => premium ? console.log('gz') : user ? config.get('emitter').emit('paymentModal', {type: 'premium', duration: 12}) : config.get('emitter').emit('openLogin', {type: 'premium'})}>
                                                {
                                                    premium ?
                                                        'Premium хэрэглэгч'
                                                        :   `${config.formatMoney(premiumPrice[12])}₮`
                                                }
                                                <ion-icon name="arrow-redo-circle"/>
                                            </button>
                                        </Col>
                                    </Row> */}
                                </div>
                            </Container>
                        </div>
                        <div className="prem-txts">
                            <div className="bggg" style={{backgroundImage: 'url("/images/bggg.jpg")'}}/>
                            <div className="bgg2">
                                <Container>
                                    <Row>
                                        <Col md={4}>
                                            <img src="/images/mortarboard.png" alt=""/>
                                            <p>
                                                ODOSURY платформд байршсан 10 чиглэлийн  мэргэжлийн, ур чадварын бүхий л хичээлийн контентууд болон сонсдог ном, ЭЕШ хичээлүүдийг 1 төлөлтөөр интернеттэй орчноос гар утас болон компьютер болон бусад төхөөрөмжөөс хязгааргүй үзэх боломжтой.
                                                {/* ODOSURY платформд байршсан 10 чиглэлийн  мэргэжлийн, ур чадварын бүхий л хичээлийн контентууд болон сонсдог ном, ЭЕШ хичээлүүдийг 1 төлөлтөөр 1 жилийн турш интернеттэй орчноос гар утас болон компьютер болон бусад төхөөрөмжөөс хязгааргүй үзэх боломжтой. */}
                                            </p>
                                        </Col>
                                        <Col md={4}>
                                            <img src="/images/presentation.png" style={{padding: '8px 0'}} alt=""/>
                                            <p>
                                                Мөн зөвхөн PREMIUM хэрэглэгчиддээ зориулж цогц систем агуулгын дагуу бэлтгэсэн хичээлүүдийг бүрэн судалж дууссаны дараа шалгалт өгч сертификат авах боломжийг олгодог.
                                            </p>
                                        </Col>
                                        <Col md={4}>
                                            <img src="/images/online-learnin.png" alt=""/>
                                            <p>
                                                Харилцагчтайгаа банйга эргэх холбоотой байдаг учраас та цаашид ямар төрлийн сургалт авах сонирхолтой байгаагаа илэрхийлэхэд бид таны хүсэлтийг хүлээн авч тухайг чиглэлийн хичээлийг оруулдгаараа онцлогтой.
                                            </p>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <Container>
                            <div className="prem-cont">
                                <div className="bolomjq">
                                    <h4>ODOSURY – ийн PREMIUM хэрэглэгчид дараах боломжууд нээлттэй</h4>
                                    <ul>
                                        <li><span className="fir">1</span><span>Хязгааргүй хэрэглээ</span></li>
                                        {/* <li><span className="fir">1</span><span>1 жилийн хязгааргүй хэрэглээ</span></li> */}
                                        <li><span className="fir">2</span><span>Олон төрлийн мэргэжлийн болоод ур чадварын хэрэгцээтэй сургалтуудыг нэг дор авах</span></li>
                                        <li><span className="fir">3</span><span>Платформ дээр байрлах бүх багцыг үнэгүй үзэх</span></li>
                                        <li><span className="fir">4</span><span>Зөвхөн 1 сургалтанд 1 удаа сурах төлбөрөөр бүх төрлийн хичээлийг үзэх эрх</span></li>
                                        <li><span className="fir">5</span><span>Бүх насныханд зориулсан</span></li>
                                        <li><span className="fir">6</span><span>Салбар бүрийн чадварлаг багш нараар бэлдүүлсэн хичээлийг үзэх эрх</span></li>
                                        <li><span className="fir">7</span><span>Хичээл болгоныг систэмтэйгээр, ойлгомжтойгоор сурахаар бэлтгэсэн учраас ойлгоход хялбар</span></li>
                                        <li><span className="fir">8</span><span>Чанар болон дуу дүрсний шаардлага хангасан сургалтын контентуудыг үзнэ</span></li>
                                        <li><span className="fir">9</span><span>Хичээлийг компьютер, гар утас, таблет, телевизор зэргээс үзэх боломжтой</span></li>
                                        <li><span className="fir">10</span><span>Интернеттэй л бол хаанаас ч 7/24 цаг сурах боломж</span></li>
                                        <li><span className="fir">11</span><span>Хичээлтэй холбоотой шалгалт өгч сертификат авах эрх</span></li>
                                        <li><span className="fir">12</span><span>Дэлхийн шилдэг бэстселлэр номнуудыг хураангуй хэлбэрээр сонсох боломж</span></li>
                                        <li><span className="fir">13</span><span>Хичээлийг систэмтэйгээр үзэж судалснаар сонирхогчоос мэргэжлийн түвшинд хүрэх боломж</span></li>
                                        <li><span className="fir">14</span><span>Зөвхөн ODOSURY хэрэглэгчдэд тусгайлан зориулж бэлтгэсэн оюуны өмчийн контентууд</span></li>
                                        <li><span className="fir">15</span><span>Үзсэн хичээлээр мэргэшиж, хаана ч ажиллахад гологдохгүй чадвартай болох</span></li>
                                    </ul>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Premium);
